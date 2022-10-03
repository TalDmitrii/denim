import { NavLink, Route } from "react-router-dom";
import { ReactComponent as IconLogo } from "../../images/svg/logo.svg";
import { ReactComponent as IconSearch } from "../../images/svg/search.svg";
import { ReactComponent as IconBasket } from "../../images/svg/basket.svg";

const MainNavigation = () => {
    return (
        <>
            <nav>
                <ul>
                    <Route path="/" exact>
                        <li>
                            <button type="button" arial-label="Toggle menu">
                                Menu
                            </button>
                        </li>
                    </Route>
                    <li>
                        <NavLink to="/">
                            <IconLogo />
                        </NavLink>
                    </li>
                    <li>
                        <button type="button">
                            <IconSearch />
                        </button>
                    </li>
                    <li>
                        <button type="button">
                            <IconBasket />
                        </button>
                    </li>
                </ul>
            </nav>
            <ul>
                <li>
                    <NavLink to="/catalog">Woman</NavLink>
                </li>
                <li>
                    <NavLink to="/catalog">Man</NavLink>
                </li>
                <li>
                    <NavLink to="/catalog">New</NavLink>
                </li>
            </ul>
        </>
    );
};

export default MainNavigation;
