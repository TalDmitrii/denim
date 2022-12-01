import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import ProductCardNews from "../components/ProductCardNews/ProductCardNews";
import FieldsetColor from "../components/UI/FieldsetColor/FieldsetColor";
import FieldsetSize from "../components/UI/FieldsetSize/FieldsetSize";
import UIButton from "../components/UI/UIButton/UIButton";
import UILink from "../components/UI/UILink/UILink";
import Loader from "../components/UI/Loader/Loader";
import NotFound from "./NotFound";
import IconHeart from "../components/UI/Icons/IconHeart";

import useHttp from "../hooks/use-http";
import { cartActions } from "../store/cart";
import { favoritesActions } from "../store/favorites";
import { getSingleProduct } from "../libs/api";

import classes from "./ProductCard.module.css";

const ProductCard = () => {
    const filterColor = useSelector((state) => state.filter.color);
    const filterSize = useSelector((state) => state.filter.size);
    const [color, setColor] = useState(filterColor ?? null);
    const [size, setSize] = useState(filterSize ?? null);
    const [isFormTouched, setIsFormTouched] = useState(false);
    const isFormValid = color && size;
    const isNotificationShown = isFormTouched && !isFormValid;

    const [descriptionIsOpen, setDescriptionIsOpen] = useState(true);
    const [limitIsNeeded, setLimitIsNeeded] = useState(false);

    const cartProducts = useSelector((state) => state.cart.products);
    const [isInCart, setIsInCart] = useState(false);

    const isMobile = useSelector((state) => state.displayMode.isMobile);
    const params = useParams();
    const productID = params.productID;
    const dispatch = useDispatch();

    const favorites = useSelector((state) => state.favorites.favorites);
    const isFavorite = favorites.find((id) => id === productID);

    useEffect(() => {
        if (!(color && size)) return;

        const isFound = cartProducts.find((item) => {
            return (
                item.id === productID &&
                item.color === color &&
                item.size === size
            );
        });

        isFound ? setIsInCart(true) : setIsInCart(false);
    }, [color, size, productID, cartProducts]);

    useEffect(() => {
        const footer = document.querySelector(".j-footer");
        if (!footer) return;
        footer.style.paddingBottom = "90px";

        return () => {
            footer.removeAttribute("style");
        };
    }, []);

    const {
        sendRequest,
        status,
        data: product,
        error,
    } = useHttp(getSingleProduct, true);

    useEffect(() => {
        sendRequest(productID);
    }, [sendRequest, productID]);

    useEffect(() => {
        const description = document.querySelector(".j-description");
        if (!description) return;

        const descriptionHeight = description.clientHeight;
        const lineHeight = parseFloat(
            window.getComputedStyle(description).lineHeight
        );
        const result = +descriptionHeight / +lineHeight;

        // 3 rows is a limit
        if (result > 3) {
            setLimitIsNeeded(true);
            setDescriptionIsOpen(false);
        }
    }, [product]);

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

    const colors = product.colors;
    const sizes = product.sizes;
    const productImages = [];

    for (let i = 1; i <= 5; i++) {
        const img = `../img/${product?.imagesFolder}/${i}-big.jpg`;
        productImages.push(img);
    }

    const scrollToForm = () => {
        const form = document.querySelector(".j-form");
        if (!form) return;

        form.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    };

    const descriptionToggle = () => {
        setDescriptionIsOpen((prevState) => !prevState);
    };

    const colorChangeHandler = (evt) => {
        const color = evt.target.value;
        setColor(color);
    };

    const sizeChangeHandler = (evt) => {
        const size = evt.target.value;
        setSize(size);
    };

    const addToCartHandler = (evt) => {
        evt.preventDefault();

        if (!color || !size) {
            isMobile && scrollToForm();
            setIsFormTouched(true);
            return;
        }

        dispatch(
            cartActions.addToCart({
                id: productID,
                color,
                size,
                localStorageID: [productID, color, size].join("&"),
            })
        );
    };

    const toggleFavorites = () => {
        isFavorite
            ? dispatch(favoritesActions.removeFromFavorites(productID))
            : dispatch(favoritesActions.addToFavorites(productID));
    };

    return (
        <div className={classes["page-wrap"]}>
            <PageContainer>
                <div className={classes["wrap"]}>
                    <ProductSlider
                        addClass={classes["slider"]}
                        images={productImages}
                    />
                    <div className={classes["details"]}>
                        <h1 className={classes["title"]}>{product.title}</h1>
                        <p
                            className={`${classes["description"]} ${
                                !descriptionIsOpen ? classes["closed"] : ""
                            } j-description`}
                        >
                            {product.description}
                        </p>
                        {limitIsNeeded && (
                            <button
                                className={classes["description-toggle"]}
                                type="button"
                                onClick={descriptionToggle}
                            >
                                Show {descriptionIsOpen ? "less" : "more"}
                            </button>
                        )}
                        <form
                            action=""
                            onSubmit={addToCartHandler}
                            className={`${classes["form"]} j-form`}
                        >
                            <FieldsetColor
                                addClass={classes["fieldset"]}
                                colors={colors}
                                checkedColor={color}
                                changeHandler={colorChangeHandler}
                            />
                            <FieldsetSize
                                addClass={classes["fieldset"]}
                                sizes={sizes}
                                checkedSize={size}
                                changeHandler={sizeChangeHandler}
                            />
                            {isNotificationShown && (
                                <p className={classes["notification"]}>
                                    Choose color and size
                                </p>
                            )}
                            <p className={classes["price"]}>
                                $ {product.price}
                            </p>
                            <div className={classes["btn-wrap"]}>
                                {!isInCart && (
                                    <UIButton
                                        addClass={classes["btn"]}
                                        type="submit"
                                    >
                                        Add to cart
                                    </UIButton>
                                )}
                                {isInCart && (
                                    <UILink
                                        addClass={classes["btn"]}
                                        to={"/cart"}
                                    >
                                        In cart
                                    </UILink>
                                )}
                                <button
                                    className={`${classes["btn-like"]}${
                                        isFavorite
                                            ? " " + classes["active"]
                                            : ""
                                    }`}
                                    type="button"
                                    aria-label="Add to favorites"
                                    onClick={toggleFavorites}
                                >
                                    <IconHeart />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </PageContainer>
            <ProductCardNews />
        </div>
    );
};

export default ProductCard;
