import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PopupCart from "../../PopupCart/PopupCart";
import IconBasket from "../../UI/Icons/IconBasket";
import IconSearch from "../../UI/Icons/IconSearch";

import classes from "./UserNavigation.module.css";

const UserNavigation = (props) => {
    const [isCartShown, setIsCartShown] = useState(false);

    const cartProductsLength = useSelector(
        (state) => state.cart.products?.length
    );

    useEffect(() => {
        if (cartProductsLength === 0) {
            setIsCartShown(false);
        }
    }, [cartProductsLength]);

    const openCartPopup = () => {
        setIsCartShown(true);
    };

    const closeCartPopup = () => {
        setIsCartShown(false);
    };

    const navClasses = `
        ${classes["user-navigation"]} 
        ${props.addClass ? " " + props.addClass : ""}`;

    return (
        <>
            <ul className={navClasses}>
                <li>
                    <button type="button">
                        <IconSearch />
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={openCartPopup}
                        disabled={cartProductsLength === 0}
                    >
                        {cartProductsLength > 0 && (
                            <span>{cartProductsLength}</span>
                        )}
                        <IconBasket />
                    </button>
                </li>
            </ul>
            {isCartShown && cartProductsLength !== 0 && (
                <PopupCart overlayClickHandler={closeCartPopup} />
            )}
        </>
    );
};

export default UserNavigation;
