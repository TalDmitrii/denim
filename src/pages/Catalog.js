import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import CatalogAdv from "../components/CatalogAdv/CatalogAdv";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import CatalogList from "../components/CatalogList/CatalogList";
import Filter from "../components/UI/Filter/Filter";
import FilterMarkers from "../components/UI/FilterMarkers/FilterMarkers";
import Loader from "../components/UI/Loader/Loader";

import useHttp from "../hooks/use-http";
import { getProducts } from "../libs/api";

import classes from "./Catalog.module.css";

const Catalog = () => {
    const params = useParams();
    const category = params.category;
    const history = useHistory();
    const [isURLChanged, setIsURLChanged] = useState(false);
    const [isFilterTouched, setIsFilterTouched] = useState(false);

    const filter = useSelector((state) => state.filter);

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
                        <FilterMarkers clickHandler={removeFilterHandler} />
                        <Filter
                            products={products}
                            filterHandler={filterHandler}
                        />
                    </PageContainer>
                    <CatalogList
                        products={products}
                        addClass={classes["products"]}
                    />
                </>
            )}
            {noProducts && <PageContainer>{noProducts}</PageContainer>}
        </>
    );
};

export default Catalog;
