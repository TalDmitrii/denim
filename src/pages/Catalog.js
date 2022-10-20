import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import CatalogAdv from "../components/CatalogAdv/CatalogAdv";
import CatalogList from "../components/CatalogList/CatalogList";

import classes from "./Catalog.module.css";
import Filter from "../components/UI/Filter/Filter";

const Catalog = () => {
    const params = useParams();
    const category = params.category;
    const products = useSelector((state) => state.products.products);

    let productList = [];

    if (category === "all") {
        productList = products;
    }

    if (category === "woman") {
        productList = products.filter((item) => item.gender === "female");
    }

    if (category === "man") {
        productList = products.filter((item) => item.gender === "male");
    }

    if (category === "new") {
        productList = products.filter((item) => item.new);
    }

    if (category === "bestsellers") {
        productList = products.filter((item) => item.bestseller);
    }

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
                <Filter products={productList} />
            </PageContainer>
            <PageContainer>
                <CatalogList products={productList} />
            </PageContainer>
        </>
    );
};

export default Catalog;
