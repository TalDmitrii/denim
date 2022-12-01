import { Modal } from "@mui/material";

import classes from "./Popup.module.css";

const Popup = (props) => {
    const popupClasses = `${classes.popup} ${
        props.addClass ? " " + props.addClass : ""
    }`;

    return (
        <Modal
            open={props.isShown}
            onClose={props.closePopup}
            aria-labelledby={props.title}
            aria-describedby={props.description}
        >
            <div className={popupClasses}>{props.children}</div>
        </Modal>
    );
};

export default Popup;
