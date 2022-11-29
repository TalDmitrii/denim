import { Link } from "react-router-dom";

import IconTrash from "../UI/Icons/IconTrash";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
    return (
        <li className={classes["item"]} data-id={props.localStorageID}>
            <Link to={`/catalog/${props.id}`} />
            <picture className={classes["img-wrap"]}>
                <source
                    srcSet={`../../img/${props.imagesFolder}/1-small.jpg 1x, ../../img/${props.imagesFolder}/1-middle.jpg 2x`}
                />
                <img
                    src={`../../img/${props.imagesFolder}/1-small.jpg`}
                    alt={props.title}
                    width="130"
                    height="168"
                />
            </picture>
            <div className={classes["info"]}>
                <h3 className={classes["title"]}>{props.title}</h3>
                <p className={classes["price"]}>{props.price} $</p>
                <p className={classes["description"]}>{props.description}</p>
                <p className={classes["color"]} data-color={props.color}>
                    {props.color}
                </p>
                <p className={classes["size"]}>
                    Size: <span>{props.size}</span>
                </p>
                <button
                    className={classes["remove"]}
                    type="button"
                    aria-label="Remove product from cart"
                    onClick={props.removeFromCartHandler}
                >
                    <IconTrash />
                </button>
            </div>
        </li>
    );
};

export default CartItem;
