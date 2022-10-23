import classes from "./FieldsetColor.module.css";

const FieldsetColor = (props) => {
    const fieldsetClasses = `${classes["fieldset"]}${
        props.addClass ? " " + props.addClass : ""
    }`;

    return (
        <fieldset className={fieldsetClasses}>
            <legend>Color</legend>
            <div className={classes["fieldset__label-wrap"]}>
                {props.colors.map((color) => (
                    <label data-color={color} key={color}>
                        <input
                            onChange={props.changeHandler}
                            type="radio"
                            value={color}
                            name="color"
                            className="hide-vis"
                            defaultChecked={props.checkedColor === color}
                        />
                        <span></span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
};

export default FieldsetColor;
