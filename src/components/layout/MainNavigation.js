import { NavLink } from "react-router-dom";

const MainNavigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Main page</NavLink>
                </li>
                <li>
                    <NavLink to="/catalog">Catalog</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/catalog/woman">Woman</NavLink>
                </li>
                <li>
                    <NavLink to="/catalog/man">Man</NavLink>
                </li>
                <li>
                    <NavLink to="/catalog/new">New</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default MainNavigation;
