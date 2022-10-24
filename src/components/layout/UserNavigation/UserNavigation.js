import classes from "./UserNavigation.module.css";

import IconBasket from "../../UI/Icons/IconBasket";
import IconSearch from "../../UI/Icons/IconSearch";

const UserNavigation = (props) => {
    const navClasses = `
        ${classes["user-navigation"]} 
        ${props.addClass ? classes[`${props.addClass}`] : ""}`;

    return (
        <ul className={navClasses}>
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
    );
};

export default UserNavigation;
