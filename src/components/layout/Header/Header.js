import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import MainNavigation from "../MainNavigation/MainNavigation";
import UserNavigation from "../UserNavigation/UserNavigation";
import Menu from "../Menu/Menu";
import BurgerMenu from "../../UI/BurgerMenu/BurgerMenu";
import Popup from "../../UI/Popup/Popup";
import Logo from "../../UI/Icons/Logo";

import classes from "./Header.module.css";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const isNavVisible = useSelector((state) => state.header.isNavVisible);

    const openModal = () => {
        setShowMenu(true);
    };

    const closeModal = () => {
        setShowMenu(false);
    };

    return (
        <header className={classes["header"]}>
            {isNavVisible && (
                <div className={`${classes["header__nav-wrap"]}`}>
                    <BurgerMenu onBurgerClick={openModal} />
                    <MainNavigation addClass={"main-navigation--header"} />
                </div>
            )}
            <div className={classes["header__logo"]}>
                <NavLink to="/">
                    <Logo />
                </NavLink>
            </div>
            {isNavVisible && (
                <div className={`${classes["header__user-nav"]}`}>
                    <UserNavigation addClass={"user-navigation--header"} />
                </div>
            )}
            {showMenu && (
                <Popup>
                    <Menu onCloseHandler={closeModal} />
                </Popup>
            )}
        </header>
    );
};

export default Header;
