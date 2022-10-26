import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Popup from "../UI/Popup/Popup";
import Overlay from "../UI/Overlay/Overlay";
import FieldsetSize from "../UI/FieldsetSize/FieldsetSize";
import FieldsetColor from "../UI/FieldsetColor/FieldsetColor";
import UIButton from "../UI/UIButton/UIButton";

import { cartActions } from "../../store/cart";

import IconBasket from "../UI/Icons/IconBasket";

import classes from "./ProductsList.module.css";

const ProductsList = (props) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const cartProducts = useSelector((state) => state.cart.products);
    const [isParamsPopupShown, setIsParamsPopupShown] = useState(false);
    const [productID, setProductID] = useState(null);
    const [productColor, setProductColor] = useState(null);
    const [productSize, setProductSize] = useState(null);
    const [isInCart, setIsInCart] = useState(false);

    const colors = products.find((item) => +item.id === productID)?.colors;
    const sizes = products.find((item) => +item.id === productID)?.sizes;

    const btnClickHandler = (evt) => {
        const id = +evt.target.closest("li").dataset.id;
        setProductID(id);
        toggleParamsPopup();
    };

    const addToCartHandler = (evt) => {
        evt.preventDefault();

        dispatch(
            cartActions.addToCart({
                id: productID,
                color: productColor,
                size: productSize,
            })
        );

        toggleParamsPopup();
    };

    const colorChangeHandler = (evt) => {
        setProductColor(evt.target.value);
    };

    const sizeChangeHandler = (evt) => {
        setProductSize(evt.target.value);
    };

    const resetValues = () => {
        setProductColor(null);
        setProductSize(null);
    };

    const toggleParamsPopup = () => {
        setIsParamsPopupShown((prevState) => !prevState);
        resetValues();
    };

    const checkIsInCart = () => {
        if (!(productColor && productSize)) return;

        const isFound = cartProducts.find((item) => {
            return (
                item.id === productID &&
                item.color === productColor &&
                item.size === productSize
            );
        });

        isFound ? setIsInCart(true) : setIsInCart(false);
    };

    useEffect(() => {
        checkIsInCart();
    }, [productColor, productSize]);

    const popupContent = (
        <>
            <Overlay onOverlayClick={toggleParamsPopup} />
            <Popup addClass={classes["popup"]}>
                <h2>Chose color and size</h2>
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

    return (
        <>
            <section>
                <div className={classes["products__title-wrap"]}>
                    <h2 className={classes["products__title"]}>
                        {props.title}
                    </h2>
                    <Link
                        className={classes["products__show-all"]}
                        to={props.viewAllHref}
                    >
                        View all
                    </Link>
                </div>
                <ul className={classes["products__list"]}>
                    {props.products.map((product) => (
                        <li
                            className={classes["products__item"]}
                            data-id={product.id}
                            key={product.id}
                        >
                            <Link to={`/catalog/${product.id}`} />
                            <picture>
                                <source
                                    media="(min-width: 768px)"
                                    srcSet={product.paths.x2}
                                />
                                <img
                                    src={product.paths.x1}
                                    alt={product.title}
                                    width="130"
                                    height="160"
                                />
                            </picture>
                            <div className={classes["products__info-wrap"]}>
                                <h3 className={classes["products__title"]}>
                                    {product.title}
                                </h3>
                                <p className={classes["products__price"]}>
                                    ${product.price}
                                </p>
                                <button
                                    className={`${
                                        classes["products__btn-basket"]
                                    }${
                                        cartProducts.find(
                                            (item) => item.id === product.id
                                        )
                                            ? " " + classes["active"]
                                            : ""
                                    }`}
                                    type="button"
                                    aria-label="Add to/Remove from basket"
                                    onClick={btnClickHandler}
                                >
                                    <IconBasket />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            {isParamsPopupShown && popupContent}
        </>
    );
};

export default ProductsList;
