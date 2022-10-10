import classes from "./FieldsetColor.module.css";

const FieldsetColor = (props) => {
    const fieldsetClasses = `${classes["fieldset"]}${
        props.addClass ? " " + props.addClass : ""
    }`;

    return (
        <fieldset className={fieldsetClasses}>
            <legend>Color</legend>
            <div className={classes["fieldset__label-wrap"]}>
                {props.colors.map((color, index) => (
                    <label data-color={color} key={color}>
                        <input
                            type="radio"
                            value={color}
                            name="color"
                            className="hide-vis"
                        />
                        <span></span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
};

export default FieldsetColor;
