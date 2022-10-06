import classes from "./UILink.module.css";
import { Link } from "react-router-dom";

const UILink = (props) => {
    return (
        <Link className={classes.link} to={`${props.to}`}>
            {props.children}
        </Link>
    );
};

export default UILink;
