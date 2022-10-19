import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PageContainer from "../components/layout/PageContainer/PageContainer";
import CatalogAdv from "../components/CatalogAdv/CatalogAdv";
import CatalogList from "../components/CatalogList/CatalogList";

import classes from "./Catalog.module.css";
import Filter from "../components/UI/Filter/Filter";

const Catalog = () => {
    const productList = useSelector((state) => state.products.products);
    const params = useParams();
    const category = params.category;

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
                            <li>
                                <span>{category}</span>
                            </li>
                        </ul>
                    </CatalogAdv>
                </PageContainer>
            </div>
            <PageContainer addClass={classes["filter-wrap"]}>
                <Filter />
            </PageContainer>
            <PageContainer>
                <CatalogList products={productList} />
            </PageContainer>
        </>
    );
};

export default Catalog;
