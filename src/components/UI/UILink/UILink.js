import { Link } from "react-router-dom";

const UILink = (props) => {
    return (
        <Link className={"button"} to={`${props.to}`}>
            {props.children}
        </Link>
    );
};

export default UILink;
