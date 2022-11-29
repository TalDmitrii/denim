import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PopupFavorites from "../../PopupFavorites/PopupFavorites";
import IconBasket from "../../UI/Icons/IconBasket";
import IconHeart from "../../UI/Icons/IconHeart";
import classes from "./UserNavigation.module.css";

const UserNavigation = (props) => {
    const [isFavoritesShown, setIsFavoritesShown] = useState(false);

    const favoritesLength = useSelector(
        (state) => state.favorites.favorites?.length
    );

    const cartProductsLength = useSelector(
        (state) => state.cart.products?.length
    );

    useEffect(() => {
        if (favoritesLength === 0) {
            setIsFavoritesShown(false);
        }
    }, [favoritesLength]);

    const openCartPopup = () => {
        setIsFavoritesShown(true);
    };

    const closeCartPopup = () => {
        setIsFavoritesShown(false);
    };

    const navClasses = `
        ${classes["user-navigation"]} 
        ${props.addClass ? " " + props.addClass : ""}`;

    return (
        <>
            <ul className={navClasses}>
                <li>
                    <button
                        type="button"
                        onClick={openCartPopup}
                        disabled={favoritesLength === 0}
                    >
                        {favoritesLength > 0 && <span>{favoritesLength}</span>}
                        <IconHeart />
                    </button>
                </li>
                <li>
                    <Link to={"/cart"}>
                        {cartProductsLength > 0 && (
                            <span>{cartProductsLength}</span>
                        )}
                        <IconBasket />
                    </Link>
                </li>
            </ul>
            {isFavoritesShown && favoritesLength !== 0 && (
                <PopupFavorites overlayClickHandler={closeCartPopup} />
            )}
        </>
    );
};

export default UserNavigation;
