import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import PopupChooseProduct from "../PopupChooseProduct/PopupChoseProduct";

import IconBasket from "../UI/Icons/IconBasket";

import classes from "./ProductsList.module.css";

const ProductsList = (props) => {
    const cartProducts = useSelector((state) => state.cart.products);
    const [isParamsPopupShown, setIsParamsPopupShown] = useState(false);
    const [productID, setProductID] = useState(null);

    const btnClickHandler = (evt) => {
        const id = evt.target.closest("li").dataset.id;
        setProductID(id);
        toggleParamsPopup();
    };

    const toggleParamsPopup = () => {
        setIsParamsPopupShown((prevState) => !prevState);
    };

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
                                    srcSet={`../img/${product.imagesFolder}/1-middle.jpg`}
                                />
                                <img
                                    src={`../img/${product.imagesFolder}/1-small.jpg`}
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
            {isParamsPopupShown && (
                <PopupChooseProduct
                    productID={productID}
                    toggleParamsPopup={toggleParamsPopup}
                />
            )}
        </>
    );
};

export default ProductsList;
