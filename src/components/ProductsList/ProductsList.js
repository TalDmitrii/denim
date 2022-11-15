import { Link } from "react-router-dom";
import { useState } from "react";

import PopupChooseProduct from "../PopupChooseProduct/PopupChoseProduct";
import Card from "../Card/Card";

import classes from "./ProductsList.module.css";

const ProductsList = (props) => {
    const productsList = props.products;
    const [isParamsPopupShown, setIsParamsPopupShown] = useState(false);
    const [productParams, setProductParams] = useState(null);

    const btnClickHandler = (evt) => {
        const btn = evt.target.closest("button");
        if (!btn) return;

        const cardId = btn.closest("li").dataset.id;
        const product = productsList.find((item) => item.id === cardId);
        setProductParams(product);
        toggleParamsPopup();
    };

    const toggleParamsPopup = () => {
        setIsParamsPopupShown((prevState) => !prevState);
    };

    const sectionAddClass = props.addClass && props.addClass;
    const headerWrapClass = `${classes["products__header-wrap"]}${
        props.titleHidden ? " hide-vis" : ""
    }`;

    return (
        <>
            <section className={sectionAddClass}>
                <div className={headerWrapClass}>
                    <h2 className={classes["products__section-header"]}>
                        {props.title}
                    </h2>
                    {props.viewAllHref && (
                        <Link
                            className={classes["products__show-all"]}
                            to={props.viewAllHref}
                        >
                            View all
                        </Link>
                    )}
                </div>
                <ul
                    className={classes["products__list"]}
                    onClick={btnClickHandler}
                >
                    {productsList.map((product) => (
                        <Card
                            product={product}
                            key={product.id}
                            path={props.path}
                        />
                    ))}
                </ul>
            </section>
            {isParamsPopupShown && productParams && (
                <PopupChooseProduct
                    productParams={productParams}
                    toggleParamsPopup={toggleParamsPopup}
                />
            )}
        </>
    );
};

export default ProductsList;
