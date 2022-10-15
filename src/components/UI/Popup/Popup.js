import ReactDOM from "react-dom";

import classes from "./Popup.module.css";

const Popup = (props) => {
    const modalRoot = document.getElementById("modal-root");
    const popupClasses = `${classes.popup} ${
        props.addClass ? " " + props.addClass : ""
    }`;

    return ReactDOM.createPortal(
        <div className={popupClasses}>{props.children}</div>,
        modalRoot
    );
};

export default Popup;
