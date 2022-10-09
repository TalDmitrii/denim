import { Link } from "react-router-dom";

import classes from "./ProductsList.module.css";

const ProductsList = (props) => {
    return (
        <section>
            <div className={classes["products__title-wrap"]}>
                <h2 className={classes["products__title"]}>{props.title}</h2>
                <Link
                    className={classes["products__show-all"]}
                    to={props.viewAllHref}
                >
                    View all
                </Link>
            </div>
            <ul className={classes["products__list"]}>
                {props.products.map((product) => (
                    <li className={classes["products__item"]} key={product.id}>
                        <Link to={`/catalog/${product.id}`} />
                        <figure>
                            <picture>
                                <source
                                    media="(min-width: 768px)"
                                    srcSet={product.paths.x2}
                                />
                                <img
                                    src={product.paths.x1}
                                    alt={product.title}
                                    width="130"
                                    height="160"
                                />
                            </picture>
                            <figcaption>{product.title}</figcaption>
                        </figure>
                        <p>${product.price}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ProductsList;
