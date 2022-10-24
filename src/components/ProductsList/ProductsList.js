import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "../../store/cart";

import IconBasket from "../UI/Icons/IconBasket";

import classes from "./ProductsList.module.css";

const ProductsList = (props) => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.products);

    const cartHandler = (evt) => {
        const id = +evt.target.closest("li").dataset.id;
        const isIncluded = cartProducts.includes(id);

        isIncluded
            ? dispatch(cartActions.removeFromCart(id))
            : dispatch(cartActions.addToCart(id));
    };

    return (
        <section>
            <div className={classes["products__title-wrap"]}>
                <h2 className={classes["products__title"]}>{props.title}</h2>
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
                                className={`${classes["products__btn-basket"]}${
                                    cartProducts.includes(product.id)
                                        ? " " + classes["active"]
                                        : ""
                                }`}
                                type="button"
                                aria-label="Add to/Remove from basket"
                                onClick={cartHandler}
                            >
                                <IconBasket />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ProductsList;
