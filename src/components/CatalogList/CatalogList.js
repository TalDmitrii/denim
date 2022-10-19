import { Link } from "react-router-dom";

import classes from "./CatalogList.module.css";

const CatalogList = (props) => {
    return (
        <ul className={classes["list"]}>
            {props.products.map((item) => (
                <li className={classes["item"]} key={item.id}>
                    <Link to={`/catalog/${item.id}`} />
                    <figure>
                        <picture>
                            <source
                                media="(min-width: 768px)"
                                srcSet={item.paths.x2}
                            />
                            <img
                                src={item.paths.x1}
                                alt={item.title}
                                width="130"
                                height="160"
                            />
                        </picture>
                        <figcaption>{item.title}</figcaption>
                    </figure>
                    <p>${item.price}</p>
                </li>
            ))}
        </ul>
    );
};

export default CatalogList;
