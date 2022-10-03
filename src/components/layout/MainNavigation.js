import { NavLink, Route } from "react-router-dom";

const MainNavigation = () => {
    return (
        <nav>
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
        </nav>
    );
};

export default MainNavigation;
