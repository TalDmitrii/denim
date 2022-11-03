import MainNavigation from "../MainNavigation/MainNavigation";

import classes from "./Menu.module.css";

const Menu = (props) => {
    return (
        <div className={classes["content"]} onClick={props.onCloseHandler}>
            <h2 className={classes["title"]}>Menu</h2>
            <button className={classes["close"]} aria-label="Close menu">
                Close
            </button>
            <MainNavigation addClass={classes["nav"]} />
        </div>
    );
};

export default Menu;
