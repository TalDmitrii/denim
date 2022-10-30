import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import MainNavigation from "../components/layout/MainNavigation/MainNavigation";
import UserNavigation from "../components/layout/UserNavigation/UserNavigation";
import New from "../components/New/New";
import Social from "../components/Social/Social";
import ProductsList from "../components/ProductsList/ProductsList";
import Collection from "../components/Collection/Collection";
import PageContainer from "../components/layout/PageContainer/PageContainer";

import { headerActions } from "../store/header";

import classes from "./MainPage.module.css";

const MainPage = () => {
    const dispatch = useDispatch();

    const bestsellers = useSelector((state) =>
        state.products.products.filter((item) => item.bestseller)
    );

    const categories = useSelector((state) => state.products.products);

    useEffect(() => {
        const intersectionTarget = document.querySelector(".j-main-nav-body");
        if (!intersectionTarget) return;

        dispatch(headerActions.setIsNavVisible(false));

        const intersectHandler = (entries) => {
            const [entry] = entries;

            entry.isIntersecting
                ? dispatch(headerActions.setIsNavVisible(false))
                : dispatch(headerActions.setIsNavVisible(true));
        };

        const observer = new IntersectionObserver(intersectHandler, {
            root: null,
            rootMargin: "0px",
            threshold: 0,
        });
        observer.observe(intersectionTarget);

        return () => {
            dispatch(headerActions.setIsNavVisible(true));
        };
    }, [dispatch]);

    return (
        <>
            <h1 className={"hide-vis"}>Online market Nimes</h1>
            <div className={classes["wrap"]}>
                <PageContainer addClass={classes["content"]}>
                    <div className={classes["grid"]}>
                        <div
                            className={`${classes["main-nav"]} j-main-nav-body`}
                        >
                            <MainNavigation
                                addClass={"main-navigation--page"}
                            />
                        </div>
                        <div className={classes["user-nav"]}>
                            <UserNavigation
                                addClass={"user-navigation--main-page"}
                            />
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
            <PageContainer addClass={classes["bestsellers"]}>
                <ProductsList
                    title={"Bestsellers"}
                    viewAllHref={"/catalog/categories/bestsellers"}
                    products={bestsellers}
                />
            </PageContainer>
            <PageContainer addClass={classes["collection"]}>
                <Collection />
            </PageContainer>
            <PageContainer addClass={classes["categories"]}>
                <ProductsList
                    title={"Categories"}
                    viewAllHref={"/catalog/categories/all"}
                    products={categories}
                />
            </PageContainer>
        </>
    );
};

export default MainPage;
