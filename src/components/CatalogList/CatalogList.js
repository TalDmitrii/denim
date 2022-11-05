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
                                srcSet={`../../img/${item.imagesFolder}/1-middle.jpg`}
                            />
                            <img
                                src={`../../img/${item.imagesFolder}/1-small.jpg`}
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
