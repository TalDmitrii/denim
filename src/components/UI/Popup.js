import ReactDOM from "react-dom";

import classes from "./Popup.module.css";

const Popup = (props) => {
    const modalRoot = document.getElementById("modal-root");

    return ReactDOM.createPortal(
        <div className={classes.popup}>{props.children}</div>,
        modalRoot
    );
};

export default Popup;
