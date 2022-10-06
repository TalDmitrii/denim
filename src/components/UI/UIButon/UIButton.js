import classes from "./UIButton.module.css";

const UIButton = (props) => {
    return (
        <button className={classes.button} type={props.type || "button"}>
            {props.children}
        </button>
    );
};

export default UIButton;
