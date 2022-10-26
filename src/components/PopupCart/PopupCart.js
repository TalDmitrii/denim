import { useSelector, useDispatch } from "react-redux";

import Overlay from "../UI/Overlay/Overlay";
import Popup from "../UI/Popup/Popup";
import IconTrash from "../UI/Icons/IconTrash";
import UILink from "../UI/UILink/UILink";

import { cartActions } from "../../store/cart";

import classes from "./PopupCart.module.css";

const PopupCart = (props) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const cartProducts = useSelector((state) => state.cart.products);

    const removeFromCartHandler = (evt) => {
        const parent = evt.target.closest("li");
        const localStorageID = parent.dataset.id;

        dispatch(cartActions.removeFromCart(localStorageID));
    };

    const updatedList = cartProducts.map((item) => {
        // Find the obect with full data
        const foundItem = products.find((product) => product.id === item.id);
        const title = foundItem.title;
        const price = foundItem.price;
        const paths = foundItem.paths;

        return { ...item, title, price, paths };
    });

    const popupContent = (
        <ul className={classes["list"]}>
            {updatedList.map((item) => (
                <li
                    className={classes["item"]}
                    data-id={item.localStorageID}
                    key={item.localStorageID}
                >
                    <picture>
                        <source
                            srcSet={`${item.paths.x1} 1x, ${item.paths.x2} 2x`}
                        />
                        <img
                            src={item.paths.x1}
                            alt={item.title}
                            width="130"
                            height="168"
                        />
                    </picture>
                    <div className={classes["info"]}>
                        <h3>{item.title}</h3>
                        <p className={classes["price"]}>{item.price} $</p>
                        <p className={classes["color"]} data-color={item.color}>
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

    return (
        <>
            <Overlay onOverlayClick={props.overlayClickHandler} />
            <Popup addClass={classes["popup"]}>
                <div className={classes["title-wrap"]}>
                    <h2 className={classes["title"]}>
                        {updatedList?.length
                            ? "Cart"
                            : "Add something to the Cart!"}
                    </h2>
                    <button
                        className={classes["btn-close"]}
                        type="button"
                        onClick={props.overlayClickHandler}
                    >
                        Close
                    </button>
                </div>
                {updatedList?.length > 0 && popupContent}
                {updatedList?.length > 0 && (
                    <UILink addClass={classes["btn-to-cart"]} to={"/"}>
                        Go to Cart
                    </UILink>
                )}
            </Popup>
        </>
    );
};

export default PopupCart;
