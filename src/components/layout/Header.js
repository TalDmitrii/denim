import { Route, NavLink } from "react-router-dom";
import { useState } from "react";

import MainNavigation from "./MainNavigation";
import UserNavigation from "./UserNavigation";
import Menu from "./Menu";
import BurgerMenu from "../UI/BurgerMenu";
import Popup from "../UI/Popup";
import Logo from "../UI/Logo";

import classes from "./Header.module.css";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const openModal = () => {
        setShowMenu(true);
    };

    const closeModal = () => {
        setShowMenu(false);
    };

    return (
        <header className={classes.header}>
            <Route path={["/catalog", "/product/:productID"]}>
                <div className={classes["header__nav-wrap"]}>
                    <BurgerMenu onBurgerClick={openModal} />
                    <MainNavigation headerNav={true} />
                </div>
            </Route>
            <div className={classes["header__logo"]}>
                <NavLink to="/">
                    <Logo />
                </NavLink>
            </div>
            <Route path={["/catalog", "/product/:productID"]}>
                <div className={classes["header__user-nav"]}>
                    <UserNavigation />
                </div>
            </Route>
            {showMenu && (
                <Popup>
                    <Menu onCloseHandler={closeModal} />
                </Popup>
            )}
        </header>
    );
};

export default Header;
