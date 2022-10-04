import classes from "./BurgerMenu.module.css";

const BurgerMenu = () => {
    return (
        <button
            className={classes.burger}
            type="button"
            aria-label="Toggle menu"
        ></button>
    );
};

export default BurgerMenu;
