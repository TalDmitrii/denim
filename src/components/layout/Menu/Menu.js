import { NavLink } from "react-router-dom";

import Popup from "../../UI/Popup/Popup";

import classes from "./Menu.module.css";

const Menu = (props) => {
    return (
        <Popup
            isShown={props.isShown}
            closePopup={props.onCloseHandler}
            addClass={classes["popup"]}
            title="Site navigation"
            description="Site navigation"
        >
            <div className={classes["content"]}>
                <h2 className={classes["title"]}>Menu</h2>
                <button
                    className={classes["close"]}
                    onClick={props.onCloseHandler}
                    aria-label="Close menu"
                >
                    Close
                </button>
                <ul className={classes["nav"]} onClick={props.onCloseHandler}>
                    <li>
                        <NavLink to="/catalog/categories/woman">Woman</NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog/categories/man">Man</NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog/categories/new">New</NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog/categories/bestsellers">
                            Bestsellers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog/categories/jeans">Jeans</NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog/categories/shirts">
                            Shirts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog/categories/jackets">
                            Jackets
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog/categories/overalls">
                            Overalls
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalog/categories/all">All</NavLink>
                    </li>
                </ul>
            </div>
        </Popup>
    );
};

export default Menu;
