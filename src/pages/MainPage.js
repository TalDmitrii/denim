import { useDispatch } from "react-redux";
import { useEffect } from "react";

import MainNavigation from "../components/layout/MainNavigation/MainNavigation";
import UserNavigation from "../components/layout/UserNavigation/UserNavigation";
import New from "../components/New/New";
import Social from "../components/Social/Social";
import ProductsList from "../components/ProductsList/ProductsList";
import Collection from "../components/Collection/Collection";
import PageContainer from "../components/layout/PageContainer/PageContainer";

import { headerActions } from "../store/header";
import { getProducts } from "../libs/api";
import useHttp from "../hooks/use-http";
import useIntersection from "../hooks/use-intersection";

import classes from "./MainPage.module.css";

const MainPage = () => {
    const dispatch = useDispatch();
    const { sendRequest, data: productList } = useHttp(getProducts);
    const { sendRequest: sendRequestBestsellers, data: bestsellersList } =
        useHttp(getProducts);

    // console.log(bestsellersList);
    const {
        checkIntersection: checkNavIntersection,
        isIntersected: isNavInViewport,
    } = useIntersection();

    useEffect(() => {
        const intersectionTarget = document.querySelector(".j-main-nav-body");
        if (!intersectionTarget) return;

        checkNavIntersection({ target: intersectionTarget });
    }, [checkNavIntersection]);

    useEffect(() => {
        isNavInViewport
            ? dispatch(headerActions.setIsNavVisible(false))
            : dispatch(headerActions.setIsNavVisible(true));

        return () => {
            dispatch(headerActions.setIsNavVisible(true));
        };
    }, [isNavInViewport, dispatch]);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    useEffect(() => {
        sendRequestBestsellers({ field: "bestseller", value: true });
    }, [sendRequestBestsellers]);

    return (
        <>
            <h1 className={"hide-vis"}>Online market Nimes</h1>
            <div className={classes["wrap"]}>
                <PageContainer addClass={classes["content"]}>
                    <div className={classes["grid"]}>
                        <div
                            className={`${classes["main-nav"]} j-main-nav-body`}
                        >
                            <MainNavigation />
                        </div>
                        <div className={classes["user-nav"]}>
                            <UserNavigation />
                        </div>
                        <div className={classes["new"]}>
                            <New />
                        </div>
                        <button
                            className={classes["quick-nav"]}
                            type="button"
                            aria-label="Scroll to next section"
                        >
                            <span></span>
                        </button>
                        <div className={classes["social"]}>
                            <Social />
                        </div>
                    </div>
                </PageContainer>
            </div>
            {!!(bestsellersList && bestsellersList.length) && (
                <PageContainer addClass={classes["bestsellers"]}>
                    <ProductsList
                        title={"Bestsellers"}
                        viewAllHref={"/catalog/categories/bestsellers"}
                        products={bestsellersList}
                    />
                </PageContainer>
            )}
            <PageContainer addClass={classes["collection"]}>
                <Collection />
            </PageContainer>
            {!!(productList && productList.length) && (
                <PageContainer addClass={classes["categories"]}>
                    <ProductsList
                        title={"Categories"}
                        viewAllHref={"/catalog/categories/all"}
                        products={productList}
                    />
                </PageContainer>
            )}
        </>
    );
};

export default MainPage;
