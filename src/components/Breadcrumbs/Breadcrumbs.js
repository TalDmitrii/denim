import { Link } from "react-router-dom";

const Breadcrumbs = (props) => {
    return (
        <ul className={props.addClass}>
            <li>
                <Link to={"/catalog/categories/all"}>All categories</Link>
            </li>
            {props.category !== "all" && (
                <li>
                    <span>{props.category}</span>
                </li>
            )}
        </ul>
    );
};

export default Breadcrumbs;
