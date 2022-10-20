import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import CatalogAdv from "../components/CatalogAdv/CatalogAdv";
import CatalogList from "../components/CatalogList/CatalogList";

import classes from "./Catalog.module.css";
import Filter from "../components/UI/Filter/Filter";

const Catalog = () => {
    const params = useParams();
    const category = params.category;
    const history = useHistory();
    const location = useLocation();
    const products = useSelector((state) => state.products.products);

    const queryParams = new URLSearchParams(location.search);
    const queryColor = queryParams.get("color");
    const querySize = queryParams.get("size");

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
        );

    const filterHandler = (formData) => {
        // Looking for objects with values
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
