import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
    const navClasses = `
        ${classes["main-navigation"]} 
        ${props.addClass ? classes[`${props.addClass}`] : ""}`;

    return (
        <nav className={navClasses}>
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