import classes from "./UserNavigation.module.css";

import { ReactComponent as IconSearch } from "../../images/svg/search.svg";
import { ReactComponent as IconBasket } from "../../images/svg/basket.svg";

const UserNavigation = () => {
    return (
        <ul className={classes["user-navigation"]}>
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
