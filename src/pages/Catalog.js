import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import CatalogAdv from "../components/CatalogAdv/CatalogAdv";
import ProductsList from "../components/ProductsList/ProductsList";
import Filter from "../components/UI/Filter/Filter";
import FilterMarkers from "../components/UI/FilterMarkers/FilterMarkers";
import Loader from "../components/UI/Loader/Loader";

import useHttp from "../hooks/use-http";
import { filterActions } from "../store/filter";
import { getProducts } from "../libs/api";

import classes from "./Catalog.module.css";

const Catalog = () => {
    const params = useParams();
    const category = params.category;
    const history = useHistory();
    const dispatch = useDispatch();
    const [isURLChanged, setIsURLChanged] = useState(false);
    const [isFilterTouched, setIsFilterTouched] = useState(false);

    const filter = useSelector((state) => state.filter);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryColor = queryParams?.get("color");
    const querySize = queryParams?.get("size");
    const queryMinPrice = +queryParams?.get("minPrice"); // ????
    const queryMaxPrice = +queryParams?.get("maxPrice");

    const {
        sendRequest,
        status,
        data: products,
        error,
    } = useHttp(getProducts, true);

    useEffect(() => {
        sendRequest({ type: category });
    }, [sendRequest, category]);

    useEffect(() => {
        queryColor && dispatch(filterActions.setColor(queryColor));
        querySize && dispatch(filterActions.setSize(querySize));
        queryMinPrice && dispatch(filterActions.setMinPrice(queryMinPrice));
        queryMaxPrice && dispatch(filterActions.setMaxPrice(queryMaxPrice));
    }, [dispatch, queryColor, querySize, queryMinPrice, queryMaxPrice]);

    const refreshURL = useCallback(
        (params) => {
            // Looking for objects with NOT empty values
            const queryItems = Object.entries(params).filter((item) => item[1]);

            const queryString = queryItems
                .map((item) => `${item[0]}=${item[1]}`)
                .join("&");

            history.push(`/catalog/categories/${category}?${queryString}`);
        },
        [category, history]
    );

    const filterHandler = useCallback(() => {
        refreshURL(filter);
    }, [refreshURL, filter]);

    useEffect(() => {
        if (!isFilterTouched) return;

        filterHandler();
    }, [isURLChanged, isFilterTouched, filterHandler]);

    const removeFilterHandler = () => {
        setIsURLChanged((prevState) => !prevState);
        setIsFilterTouched(true);
    };

    let noContent = null;

    if (status === "pending") {
        noContent = <Loader />;
    }

    if (error) {
        noContent = <div>{error}</div>;
    }

    if (status === "completed" && (!products || products.length === 0)) {
        noContent = <div>Products not found</div>;
    }

    const renderedList = products
        ?.filter((item) =>
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
                {products && (
                    <>
                        <FilterMarkers clickHandler={removeFilterHandler} />
                        <Filter
                            products={products}
                            filterHandler={filterHandler}
                        />
                    </>
                )}
            </PageContainer>
            <PageContainer>
                {products && (
                    <ProductsList
                        title={"Catalog list"}
                        titleHidden={true}
                        products={renderedList}
                        addClass={classes["products"]}
                        path={"../../img/"}
                    />
                )}
                {!products && noContent}
            </PageContainer>
        </>
    );
};

export default Catalog;
