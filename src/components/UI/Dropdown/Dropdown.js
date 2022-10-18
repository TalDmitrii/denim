import { useState } from "react";

import classes from "./Dropdown.module.css";

const Dropdown = (props) => {
    const [open, setOpen] = useState(false);

    const clickHandler = () => {
        setOpen((prevState) => !prevState);
    };

    const dropdownClasses = `
        ${props.addClass ? " " + props.addClass : ""}
        ${open ? " " + classes["open"] : ""}`;

    const contentClasses = `
        ${classes["content"]}
        ${props.contentClass ? " " + props.contentClass : ""}`;

    return (
        <div className={dropdownClasses}>
            <div className={classes["top-wrap"]}>
                <h3 className={classes["title"]}>{props.title}</h3>
                <button
                    className={classes["toggle"]}
                    type="button"
                    aria-label={`${open ? "Open" : "Close"} dropdown`}
                    onClick={clickHandler}
                ></button>
            </div>
            <div className={contentClasses}>{props.children}</div>
        </div>
    );
};

export default Dropdown;
