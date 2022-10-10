import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import FieldsetColor from "../components/UI/FieldsetColor/FieldsetColor";
import FieldsetSize from "../components/UI/FieldsetSize/FieldsetSize";
import UIButton from "../components/UI/UIButon/UIButton";

import classes from "./ProductCard.module.css";

const ProductCard = () => {
    const params = useParams();
    const productID = params.productID;
    const productList = useSelector((state) => state.products.products);
    const product = productList.find((item) => item.id === +productID);

    const colors = ["turquoise", "blue", "grey", "black", "bluelight"];
    const sizes = ["xs", "s", "m", "l", "xl"];

    return (
        <PageContainer addClass={classes["product"]}>
            <div className={classes["product__wrap"]}>
                <ProductSlider
                    addClass={classes["product__slider"]}
                    product={product}
                />
                <div className={classes["product__details"]}>
                    <h1 className={classes["product__title"]}>
                        {product.title}
                    </h1>
                    <p className={classes["product__description"]}>
                        {product.description}
                    </p>
                    <form action="" className={classes["product__form"]}>
                        <FieldsetColor
                            addClass={classes["product__fieldset"]}
                            colors={colors}
                        />
                        <FieldsetSize
                            addClass={classes["product__fieldset"]}
                            sizes={sizes}
                        />
                        <p className={classes["product__price"]}>
                            $ {product.price}
                        </p>
                        <UIButton
                            addClass={classes["product__btn"]}
                            type="submit"
                        >
                            Add to cart
                        </UIButton>
                    </form>
                </div>
            </div>
        </PageContainer>
    );
};

export default ProductCard;
