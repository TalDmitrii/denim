import { Route, NavLink } from "react-router-dom";
import Logo from "../UI/Logo";
import MainNavigation from "./MainNavigation";
import UserNavigation from "./UserNavigation";

const Header = () => {
    return (
        <header>
            <Route path={["/catalog", "/product/:productID"]}>
                <MainNavigation />
            </Route>
            <NavLink to="/">
                <Logo />
            </NavLink>
            <Route path={["/catalog", "/product/:productID"]}>
                <UserNavigation />
            </Route>
        </header>
    );
};

export default Header;
