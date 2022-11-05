import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import Overlay from "../UI/Overlay/Overlay";
import Popup from "../UI/Popup/Popup";
import FieldsetColor from "../UI/FieldsetColor/FieldsetColor";
import FieldsetSize from "../UI/FieldsetSize/FieldsetSize";
import UIButton from "../UI/UIButton/UIButton";
import Loader from "../UI/Loader/Loader";
import NotFound from "../../pages/NotFound";

import useHttp from "../../hooks/use-http";
import { getProducts } from "../../libs/api"; // Only one item

import { cartActions } from "../../store/cart";

import classes from "./PopupChoseProduct.module.css";

const PopupChooseProduct = (props) => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.products);

    const [productColor, setProductColor] = useState(null);
    const [productSize, setProductSize] = useState(null);
    const [isInCart, setIsInCart] = useState(false);

    const productID = props.productID;

    const {
        sendRequest,
        status,
        data: products,
        error,
    } = useHttp(getProducts, true);

    console.log(products);

    useEffect(() => {
        if (!(productColor && productSize)) return;

        const isFound = cartProducts.find((item) => {
            return (
                item.id === productID &&
                item.color === productColor &&
                item.size === productSize
            );
        });

        isFound ? setIsInCart(true) : setIsInCart(false);
    }, [productColor, productSize, productID, cartProducts]);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === "pending") {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (status === "completed" && (!products || products.length === 0)) {
        return <NotFound />;
    }

    const colors = products.find((item) => item.id === productID)?.colors;
    const sizes = products.find((item) => item.id === productID)?.sizes;

    const addToCartHandler = (evt) => {
        evt.preventDefault();

        dispatch(
            cartActions.addToCart({
                id: productID,
                color: productColor,
                size: productSize,
                localStorageID: [productID, productColor, productSize].join(
                    "&"
                ),
            })
        );

        props.toggleParamsPopup();
    };

    const colorChangeHandler = (evt) => {
        setProductColor(evt.target.value);
    };

    const sizeChangeHandler = (evt) => {
        setProductSize(evt.target.value);
    };

    return (
        <>
            <Overlay onOverlayClick={props.toggleParamsPopup} />
            <Popup addClass={classes["popup"]}>
                <h2>Choose color and size</h2>
                <form action="" onSubmit={addToCartHandler}>
                    <FieldsetColor
                        colors={colors}
                        changeHandler={colorChangeHandler}
                    />
                    <FieldsetSize
                        sizes={sizes}
                        changeHandler={sizeChangeHandler}
                    />
                    <UIButton
                        type={"submit"}
                        disabled={!(productColor && productSize) || isInCart}
                    >
                        {isInCart ? "In cart" : "Add to cart"}
                    </UIButton>
                </form>
            </Popup>
        </>
    );
};

export default PopupChooseProduct;
