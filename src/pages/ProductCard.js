import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import FieldsetColor from "../components/UI/FieldsetColor/FieldsetColor";
import FieldsetSize from "../components/UI/FieldsetSize/FieldsetSize";
import UIButton from "../components/UI/UIButton/UIButton";

import classes from "./ProductCard.module.css";

const ProductCard = () => {
    const params = useParams();
    const productID = params.productID;
    const productList = useSelector((state) => state.products.products);
    const product = productList.find((item) => item.id === +productID);

    const [productImages, setProductImages] = useState([
        product.paths.x1,
        ...product.paths.previews,
    ]);

    const colors = ["turquoise", "blue", "grey", "black", "bluelight"];
    const sizes = ["xs", "s", "m", "l", "xl"];

    const sliderClickHandler = (evt) => {
        const direction = evt.target.dataset?.direction;

        if (!direction) return;

        setProductImages((prevState) => {
            let newState;

            if (direction === "forward") {
                const activeElem = prevState.slice(-1);
                newState = [...activeElem, ...prevState.slice(0, -1)];
            }

            if (direction === "backward") {
                const activeElem = prevState[0];
                newState = [...prevState.slice(1), activeElem];
            }

            return newState;
        });
    };

    return (
        <PageContainer>
            <div className={classes["wrap"]}>
                <ProductSlider
                    addClass={classes["slider"]}
                    images={productImages}
                    onSliderClick={sliderClickHandler}
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
                        />
                        <FieldsetSize
                            addClass={classes["fieldset"]}
                            sizes={sizes}
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
