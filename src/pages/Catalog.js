import { useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import CatalogAdv from "../components/CatalogAdv/CatalogAdv";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import CatalogList from "../components/CatalogList/CatalogList";
import Filter from "../components/UI/Filter/Filter";
import FilterMarkers from "../components/UI/FilterMarkers/FilterMarkers";
import Loader from "../components/UI/Loader/Loader";

import useHttp from "../hooks/use-http";
import { getProducts } from "../libs/api";
import { filterProducts } from "../utils/utils";
import { filterActions } from "../store/filter";

import classes from "./Catalog.module.css";

const Catalog = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const category = params.category;
    const filterParams = useSelector((state) => state.filter);

    const {
        sendRequest,
        status,
        data: products,
        error,
    } = useHttp(getProducts, true);

    useEffect(() => {
        if (!category) return;
        sendRequest({ type: category });
    }, [sendRequest, category]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryColor = queryParams?.get("color");
    const querySize = queryParams?.get("size");
    const queryMinPrice = +queryParams?.get("minPrice");
    const queryMaxPrice = +queryParams?.get("maxPrice");

    // If open page with URL params then update filter
    useEffect(() => {
        queryColor && dispatch(filterActions.setColor(queryColor));
        querySize && dispatch(filterActions.setSize(querySize));
        queryMinPrice && dispatch(filterActions.setMinPrice(queryMinPrice));
        queryMaxPrice && dispatch(filterActions.setMaxPrice(queryMaxPrice));
    }, [dispatch, queryColor, querySize, queryMinPrice, queryMaxPrice]);

    const renderedList = filterProducts(
        products,
        queryColor,
        querySize,
        queryMinPrice,
        queryMaxPrice
    );

    const refreshURL = useCallback(
        (params, category) => {
            // Looking for objects with NOT empty values
            const queryItems = Object.entries(params).filter((item) => item[1]);

            const queryString = queryItems
                .map((item) => `${item[0]}=${item[1]}`)
                .join("&");

            history.push(`/catalog/categories/${category}?${queryString}`);
        },
        [history]
    );

    const filterHandler = useCallback(() => {
        refreshURL(filterParams, category);
    }, [refreshURL, filterParams, category]);

    let noProducts = null;

    if (status === "pending") {
        noProducts = <Loader />;
    }

    if (error) {
        noProducts = <p>{error}</p>;
    }

    if (status === "completed" && (!products || products.length === 0)) {
        noProducts = (
            <p className={classes["not-found"]}>Products not found.</p>
        );
    }

    return (
        <>
            <h1 className="hide-vis">Catalog</h1>
            <div className={classes["wrap"]}>
                <PageContainer>
                    <CatalogAdv>
                        <Breadcrumbs
                            addClass={classes["breadcrumbs"]}
                            category={category}
                        />
                    </CatalogAdv>
                </PageContainer>
            </div>
            {!!(products && products.length) && (
                <>
                    <PageContainer addClass={classes["filter-wrap"]}>
                        <FilterMarkers
                            filterHandler={filterHandler}
                            color={queryColor}
                            size={querySize}
                            minPrice={queryMinPrice}
                            maxPrice={queryMaxPrice}
                        />
                        <Filter
                            products={products}
                            filterHandler={filterHandler}
                        />
                    </PageContainer>
                    <CatalogList
                        products={renderedList}
                        addClass={classes["products"]}
                    />
                </>
            )}
            {noProducts && <PageContainer>{noProducts}</PageContainer>}
        </>
    );
};

export default Catalog;
