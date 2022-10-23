import classes from "./FieldsetSize.module.css";

const FieldsetSize = (props) => {
    const fieldsetClasses = `${classes["fieldset"]}${
        props.addClass ? " " + props.addClass : ""
    }`;

    return (
        <fieldset className={fieldsetClasses}>
            <legend>Size</legend>
            <div className={classes["fieldset__label-wrap"]}>
                {props.sizes.map((size) => (
                    <label key={size}>
                        <input
                            onChange={props.changeHandler}
                            type="radio"
                            value={size}
                            name="size"
                            className="hide-vis"
                            defaultChecked={props.checkedSize === size}
                        />
                        <span>{size}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
};

export default FieldsetSize;
