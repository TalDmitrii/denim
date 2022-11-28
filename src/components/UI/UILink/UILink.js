import { Link } from "react-router-dom";

const UILink = (props) => {
    const linkClasses = `button${props.addClass ? " " + props.addClass : ""}`;

    return (
        <Link
            className={linkClasses}
            to={`${props.to}`}
            onClick={props.onClick}
        >
            {props.children}
        </Link>
    );
};

export default UILink;
