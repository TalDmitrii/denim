import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import CatalogAdv from "../components/CatalogAdv/CatalogAdv";
import CatalogList from "../components/CatalogList/CatalogList";
import Filter from "../components/UI/Filter/Filter";

import { filterActions } from "../store/filter";

import classes from "./Catalog.module.css";

const Catalog = () => {
    const params = useParams();
    const category = params.category;
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    const queryParams = new URLSearchParams(location.search);
    const queryColor = queryParams.get("color");
    const querySize = queryParams.get("size");
    const queryMinPrice = +queryParams.get("minPrice");
    const queryMaxPrice = +queryParams.get("maxPrice");

    useEffect(() => {
        queryColor && dispatch(filterActions.setColor(queryColor));
        querySize && dispatch(filterActions.setSize(querySize));
        queryMinPrice && dispatch(filterActions.setMinPrice(queryMinPrice));
        queryMaxPrice && dispatch(filterActions.setMaxPrice(queryMaxPrice));
    }, [dispatch, queryColor, querySize, queryMinPrice, queryMaxPrice]);

    let filteredByCategory = [];

    switch (category) {
        case "woman":
            filteredByCategory = products.filter(
                (item) => item.gender === "female"
            );
            break;
        case "man":
            filteredByCategory = products.filter(
                (item) => item.gender === "male"
            );
            break;
        case "new":
            filteredByCategory = products.filter((item) => item.new);
            break;
        case "bestsellers":
            filteredByCategory = products.filter((item) => item.bestseller);
            break;
        default:
            filteredByCategory = [...products];
    }
    ////////////////////////////
    ////////////////////////////
    ////////////////////////////

    const renderedList = filteredByCategory
        .filter((item) =>
            queryColor ? item.colors.includes(queryColor) : item.colors.length
        )
        .filter((item) =>
            querySize ? item.sizes.includes(querySize) : item.sizes.length
        )
        .filter((item) =>
            queryMinPrice ? item.price >= queryMinPrice : item.price
        )
        .filter((item) =>
            queryMaxPrice ? item.price <= queryMaxPrice : item.price
        );

    const filterHandler = (formData) => {
        // Looking for objects with NOT empty values
        const queryItems = Object.entries(formData).filter((item) => item[1]);

        const queryString = queryItems
            .map((item) => `${item[0]}=${item[1]}`)
            .join("&");

        history.push(`/catalog/categories/${category}?${queryString}`);
    };

    return (
        <>
            <h1 className="hide-vis">Catalog</h1>
            <div className={classes["wrap"]}>
                <PageContainer>
                    <CatalogAdv>
                        <ul className={classes["breadcrumbs"]}>
                            <li>
                                <Link to={"/catalog/categories/all"}>
                                    All categories
                                </Link>
                            </li>
                            {category !== "all" && (
                                <li>
                                    <span>{category}</span>
                                </li>
                            )}
                        </ul>
                    </CatalogAdv>
                </PageContainer>
            </div>
            <PageContainer addClass={classes["filter-wrap"]}>
                <Filter
                    products={filteredByCategory}
                    filterHandler={filterHandler}
                />
            </PageContainer>
            <PageContainer>
                <CatalogList products={renderedList} />
            </PageContainer>
        </>
    );
};

export default Catalog;
