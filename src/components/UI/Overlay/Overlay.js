import ReactDOM from "react-dom";

import classes from "./Overlay.module.css";

const Overlay = (props) => {
    const overlayRoot = document.getElementById("overlay-root");

    return ReactDOM.createPortal(
        <div onClick={props.onOverlayClick} className={classes.overlay}></div>,
        overlayRoot
    );
};

export default Overlay;
