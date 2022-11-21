import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Overlay from "../UI/Overlay/Overlay";
import Popup from "../UI/Popup/Popup";
import IconTrash from "../UI/Icons/IconTrash";
import UILink from "../UI/UILink/UILink";
import Loader from "../UI/Loader/Loader";

import useHttp from "../../hooks/use-http";
import { getProducts } from "../../libs/api";
import { cartActions } from "../../store/cart";

import classes from "./PopupCart.module.css";

const PopupCart = (props) => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.products);

    const {
        sendRequest,
        status,
        data: products,
        error,
    } = useHttp(getProducts, true);

    useEffect(() => {
        sendRequest({ type: "all" }); //Need to fetch defined products only
    }, [sendRequest]);

    const removeFromCartHandler = (evt) => {
        const parent = evt.target.closest("li");
        const localStorageID = parent.dataset.id;

        dispatch(cartActions.removeFromCart(localStorageID));
    };

    let noProducts;

    if (status === "pending") {
        noProducts = <Loader />;
    }

    if (error) {
        noProducts = <p>{error}</p>;
    }

    if (status === "completed" && (!products || products.length === 0)) {
        noProducts = <p>No products found</p>;
    }

    let popupContent;

    if (products && products.length) {
        const updatedList = cartProducts.map((item) => {
            // Find the obect with full data
            const foundItem = products.find(
                (product) => product.id === item.id
            );
            const title = foundItem.title;
            const price = foundItem.price;
            const imagesFolder = foundItem.imagesFolder;

            return { ...item, title, price, imagesFolder };
        });

        popupContent = (
            <ul className={classes["list"]}>
                {updatedList.map((item) => (
                    <li
                        className={classes["item"]}
                        data-id={item.localStorageID}
                        key={item.localStorageID}
                    >
                        <Link
                            onClick={props.overlayClickHandler}
                            to={`/catalog/${item.id}`}
                        />
                        <picture>
                            <source
                                srcSet={`../../img/${item.imagesFolder}/1-small.jpg 1x, ../../img/${item.imagesFolder}/1-middle.jpg 2x`}
                            />
                            <img
                                src={`../../img/${item.imagesFolder}/1-small.jpg`}
                                alt={item.title}
                                width="130"
                                height="168"
                            />
                        </picture>
                        <div className={classes["info"]}>
                            <h3>{item.title}</h3>
                            <p className={classes["price"]}>{item.price} $</p>
                            <p
                                className={classes["color"]}
                                data-color={item.color}
                            >
                                {item.color}
                            </p>
                            <p className={classes["size"]}>
                                Size: <span>{item.size}</span>
                            </p>
                            <button
                                className={classes["remove"]}
                                type="button"
                                aria-label="Remove product from cart"
                                onClick={removeFromCartHandler}
                            >
                                <IconTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <>
            <Overlay onOverlayClick={props.overlayClickHandler} />
            <Popup addClass={classes["popup"]}>
                <div className={classes["title-wrap"]}>
                    <h2 className={classes["title"]}>Cart</h2>
                    <button
                        className={classes["btn-close"]}
                        type="button"
                        onClick={props.overlayClickHandler}
                        aria-label="Close cart popup"
                    >
                        Close
                    </button>
                </div>
                {popupContent && popupContent}
                {noProducts && noProducts}
                <UILink addClass={classes["btn-to-cart"]} to={"/"}>
                    Go to Cart
                </UILink>
            </Popup>
        </>
    );
};

export default PopupCart;
