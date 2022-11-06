import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useIntersection from "../../hooks/use-intersection";

import classes from "./CategoriesList.module.css";

const categories = [
    { id: Math.random(), title: "Jeans" },
    { id: Math.random(), title: "Shirts" },
    { id: Math.random(), title: "Jackets" },
    { id: Math.random(), title: "Overalls" },
];

const CategoriesList = () => {
    const { checkIntersection, isIntersected } = useIntersection();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        isIntersected && setIsLoaded(true);
    }, [isIntersected, setIsLoaded]);

    useEffect(() => {
        const intersectionTarget = document.querySelector(".j-categories");
        if (!intersectionTarget) return;

        checkIntersection({ target: intersectionTarget });
    }, [checkIntersection]);

    return (
        <section className="j-categories">
            <div className={classes["products__header-wrap"]}>
                <h2 className={classes["products__section-header"]}>
                    Categories
                </h2>
                <Link
                    className={classes["products__show-all"]}
                    to={"/catalog/categories/all"}
                >
                    View all
                </Link>
            </div>
            {(isIntersected || isLoaded) && (
                <ul className={classes["products__list"]}>
                    {categories.map((item) => (
                        <li className={classes["products__item"]} key={item.id}>
                            <Link
                                to={`/catalog/categories/${item.title.toLocaleLowerCase()}`}
                            />
                            <picture>
                                <source
                                    media="(min-width: 768px)"
                                    srcSet={`../categories/${item.title.toLocaleLowerCase()}@2x.jpg`}
                                />
                                <img
                                    src={`../categories/${item.title.toLocaleLowerCase()}@1x.jpg`}
                                    alt={item.title}
                                    width="130"
                                    height="160"
                                />
                            </picture>
                            <h3 className={classes["products__title"]}>
                                {item.title}
                            </h3>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default CategoriesList;
