import { NavLink } from "react-router-dom";

import Popup from "../../UI/Popup/Popup";

import classes from "./Menu.module.css";

const Menu = (props) => {
    return (
        <Popup addClass={classes["popup"]}>
            <div className={classes["content"]} onClick={props.onCloseHandler}>
                <h2 className={classes["title"]}>Menu</h2>
                <button className={classes["close"]} aria-label="Close menu">
                    Close
                </button>
                <ul className={classes["nav"]}>
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
