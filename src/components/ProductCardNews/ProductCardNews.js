import { useEffect, useState } from "react";
import useIntersection from "../../hooks/use-intersection";
import useHttp from "../../hooks/use-http";

import PageContainer from "../layout/PageContainer/PageContainer";
import ProductsList from "../ProductsList/ProductsList";

import { getProducts } from "../../libs/api";

import classes from "./ProductCardNews.module.css";

const ProductCardNews = () => {
    const { checkIntersection, isIntersected } = useIntersection();
    const [isFirstIntersection, setIsFirstIntersection] = useState(false);

    const { sendRequest: sendRequestNews, data: newsList } =
        useHttp(getProducts);

    useEffect(() => {
        isIntersected && setIsFirstIntersection(true);
    }, [isIntersected, setIsFirstIntersection]);

    useEffect(() => {
        const intersectionTarget = document.querySelector(".j-news");
        if (!intersectionTarget) return;

        checkIntersection({ target: intersectionTarget });
    }, [checkIntersection]);

    useEffect(() => {
        if (!isFirstIntersection) return;

        sendRequestNews({
            type: "new",
            limit: "&limitToLast=4",
        });
    }, [sendRequestNews, isFirstIntersection]);

    return (
        <div className={"j-news"}>
            {!!(newsList && newsList.length) && (
                <PageContainer addClass={`${classes["news"]}`}>
                    <ProductsList
                        title={"News"}
                        viewAllHref={"/catalog/categories/news"}
                        products={newsList}
                        addClass={classes["products"]}
                        path={"../img/"}
                    />
                </PageContainer>
            )}
        </div>
    );
};

export default ProductCardNews;
