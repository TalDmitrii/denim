import { Link } from "react-router-dom";

import classes from "./CatalogList.module.css";

const CatalogList = (props) => {
    return (
        <ul className={classes["list"]}>
            {props.products.map((item) => (
                <li className={classes["item"]} key={item.id}>
                    <Link to={`/catalog/${item.id}`} />
                    <picture>
                        <source
                            media="(min-width: 768px)"
                            srcSet={`../../img/${item.imagesFolder}/1-big.jpg`}
                        />
                        <img
                            src={`../../img/${item.imagesFolder}/1-middle.jpg`}
                            alt={item.title}
                            width="130"
                            height="160"
                        />
                    </picture>
                    <h3>{item.title}</h3>
                    <p>${item.price}</p>
                </li>
            ))}
        </ul>
    );
};

export default CatalogList;
