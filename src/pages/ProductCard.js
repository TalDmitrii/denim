import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import FieldsetColor from "../components/UI/FieldsetColor/FieldsetColor";
import FieldsetSize from "../components/UI/FieldsetSize/FieldsetSize";
import UIButton from "../components/UI/UIButton/UIButton";
import Loader from "../components/UI/Loader/Loader";
import NotFound from "./NotFound";

import useHttp from "../hooks/use-http";
import { getSingleProduct } from "../libs/api";

import classes from "./ProductCard.module.css";

const ProductCard = () => {
    const params = useParams();
    const productID = params.productID;

    const chosenColor = useSelector((state) => state.filter.color); // ???????
    const chosenSize = useSelector((state) => state.filter.size); // ???????

    const {
        sendRequest,
        status,
        data: product,
        error,
    } = useHttp(getSingleProduct, true);

    useEffect(() => {
        sendRequest(productID);
    }, [sendRequest, productID]);

    if (status === "pending") {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (status === "completed" && !product) {
        return <NotFound />;
    }

    if (!product) return;

    const colors = product?.colors;
    const sizes = product?.sizes;
    const productImages = [];

    for (let i = 1; i <= 5; i++) {
        const img = `../img/${product?.imagesFolder}/${i}-big.jpg`;
        productImages.push(img);
    }

    return (
        <PageContainer>
            <div className={classes["wrap"]}>
                <ProductSlider
                    addClass={classes["slider"]}
                    images={productImages}
                />
                <div className={classes["details"]}>
                    <h1 className={classes["title"]}>{product.title}</h1>
                    <p className={classes["description"]}>
                        {product.description}
                    </p>
                    <form action="" className={classes["form"]}>
                        <FieldsetColor
                            addClass={classes["fieldset"]}
                            colors={colors}
                            checkedColor={chosenColor}
                        />
                        <FieldsetSize
                            addClass={classes["fieldset"]}
                            sizes={sizes}
                            checkedSize={chosenSize}
                        />
                        <p className={classes["price"]}>$ {product.price}</p>
                        <UIButton addClass={classes["btn"]} type="submit">
                            Add to cart
                        </UIButton>
                    </form>
                </div>
            </div>
        </PageContainer>
    );
};

export default ProductCard;
