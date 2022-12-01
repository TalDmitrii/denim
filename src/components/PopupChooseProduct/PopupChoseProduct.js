import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import Popup from "../UI/Popup/Popup";
import FieldsetColor from "../UI/FieldsetColor/FieldsetColor";
import FieldsetSize from "../UI/FieldsetSize/FieldsetSize";
import UIButton from "../UI/UIButton/UIButton";

import { cartActions } from "../../store/cart";

import classes from "./PopupChoseProduct.module.css";

const PopupChooseProduct = (props) => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.products);

    const [productColor, setProductColor] = useState(null);
    const [productSize, setProductSize] = useState(null);
    const [isInCart, setIsInCart] = useState(false);

    const { id: productID, colors, sizes } = props.productParams;

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

        setProductColor(null);
        setProductSize(null);
        props.toggleParamsPopup();
    };

    const colorChangeHandler = (evt) => {
        setProductColor(evt.target.value);
    };

    const sizeChangeHandler = (evt) => {
        setProductSize(evt.target.value);
    };

    return (
        <Popup
            isShown={props.isShown}
            closePopup={props.toggleParamsPopup}
            addClass={classes["popup"]}
            title="Choose color and size"
            description="Choose color and size in order to add the product to cart"
        >
            <div className={classes["header-wrap"]}>
                <h2>Choose color and size</h2>
                <button
                    className={classes["close"]}
                    onClick={props.toggleParamsPopup}
                    aria-label="Close popup"
                >
                    <span></span>
                </button>
            </div>
            <form action="" onSubmit={addToCartHandler}>
                <FieldsetColor
                    colors={colors}
                    changeHandler={colorChangeHandler}
                />
                <FieldsetSize sizes={sizes} changeHandler={sizeChangeHandler} />
                <UIButton
                    addClass={classes["submit"]}
                    type={"submit"}
                    disabled={!(productColor && productSize) || isInCart}
                >
                    {isInCart ? "In cart" : "Add to cart"}
                </UIButton>
            </form>
        </Popup>
    );
};

export default PopupChooseProduct;
