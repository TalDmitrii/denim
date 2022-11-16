import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import PageContainer from "../layout/PageContainer/PageContainer";
import ProductsList from "../ProductsList/ProductsList";

import { filterProducts } from "../../utils/utils";
import { filterActions } from "../../store/filter";

const CatalogList = (props) => {
    const { products, addClass } = props;
    const dispatch = useDispatch();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryColor = queryParams?.get("color");
    const querySize = queryParams?.get("size");
    const queryMinPrice = +queryParams?.get("minPrice"); // ????
    const queryMaxPrice = +queryParams?.get("maxPrice");

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

    return (
        <PageContainer>
            <ProductsList
                title={"Catalog list"}
                titleHidden={true}
                products={renderedList}
                addClass={addClass}
                path={"../../img/"}
            />
        </PageContainer>
    );
};

export default CatalogList;
