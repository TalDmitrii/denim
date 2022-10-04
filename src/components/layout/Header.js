import { Route, NavLink } from "react-router-dom";

import MainNavigation from "./MainNavigation";
import UserNavigation from "./UserNavigation";

import classes from "./Header.module.css";
import Logo from "../UI/Logo";
import BurgerMenu from "../UI/BurgerMenu";

const Header = () => {
    return (
        <header className={classes.header}>
            <Route path={["/catalog", "/product/:productID"]}>
                <div className={classes["header__nav-wrap"]}>
                    <BurgerMenu />
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
        </header>
    );
};

export default Header;
