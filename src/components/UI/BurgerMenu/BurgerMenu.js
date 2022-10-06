import classes from "./BurgerMenu.module.css";

const BurgerMenu = (props) => {
    return (
        <button
            className={classes.burger}
            type="button"
            aria-label="Open menu"
            onClick={props.onBurgerClick}
        ></button>
    );
};

export default BurgerMenu;
