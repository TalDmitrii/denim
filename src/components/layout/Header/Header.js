import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import MainNavigation from "../MainNavigation/MainNavigation";
import UserNavigation from "../UserNavigation/UserNavigation";
import Menu from "../Menu/Menu";
import BurgerMenu from "../../UI/BurgerMenu/BurgerMenu";
import Logo from "../../UI/Icons/Logo";

import classes from "./Header.module.css";
import PageContainer from "../PageContainer/PageContainer";

const Header = () => {
    const [isMenuShown, setIsMenuShown] = useState(false);
    const isNavVisible = useSelector((state) => state.header.isNavVisible);

    const openModal = () => {
        setIsMenuShown(true);
    };

    const closeModal = () => {
        setIsMenuShown(false);
    };

    return (
        <PageContainer>
            <header className={classes["header"]}>
                {isNavVisible && (
                    <div className={classes["header__nav-wrap"]}>
                        <BurgerMenu onBurgerClick={openModal} />
                        <MainNavigation
                            addClass={classes["header__main-nav"]}
                        />
                    </div>
                )}
                <div className={classes["header__logo"]}>
                    <NavLink to="/">
                        <Logo />
                    </NavLink>
                </div>
                {isNavVisible && (
                    <div className={`${classes["header__user-nav"]}`}>
                        <UserNavigation />
                    </div>
                )}
                <Menu isShown={isMenuShown} onCloseHandler={closeModal} />
            </header>
        </PageContainer>
    );
};

export default Header;
