import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import IconBasket from "../UI/Icons/IconBasket";

import classes from "./Card.module.css";

const Card = (props) => {
    const cartProducts = useSelector((state) => state.cart.products);

    return (
        <li className={classes["card"]} data-id={props.product.id}>
            <Link to={`/catalog/${props.product.id}`} />
            <div className={classes["card__img-wrap"]}>
                {props.product.new && (
                    <p className={classes["card__new"]}>New</p>
                )}
                <picture>
                    <source
                        media="(min-width: 768px)"
                        srcSet={`${props.path}${props.product.imagesFolder}/1-big.jpg`}
                    />
                    <img
                        src={`${props.path}${props.product.imagesFolder}/1-middle.jpg`}
                        alt={props.product.title}
                        width="130"
                        height="160"
                    />
                </picture>
            </div>
            <div className={classes["card__info-wrap"]}>
                <h3 className={classes["card__title"]}>
                    {props.product.title}
                </h3>
                <p className={classes["card__price"]}>${props.product.price}</p>
                <button
                    className={`${classes["card__btn-basket"]}${
                        cartProducts.find(
                            (item) => item.id === props.product.id
                        )
                            ? " " + classes["active"]
                            : ""
                    }`}
                    type="button"
                    aria-label="Add to/Remove from basket"
                >
                    <IconBasket />
                </button>
            </div>
        </li>
    );
};

export default Card;
