import MainNavigation from "../components/layout/MainNavigation/MainNavigation";
import UserNavigation from "../components/layout/UserNavigation/UserNavigation";

import classes from "./MainPage.module.css";

import New from "../components/New/New";
import Social from "../components/Social/Social";
import ProductsList from "../components/ProductsList/ProductsList";
import Collection from "../components/Collection/Collection";
import PageContainer from "../components/layout/PageContainer/PageContainer";
import { useSelector } from "react-redux";

const MainPage = () => {
    const bestsellers = useSelector((state) =>
        state.products.products.filter(
            (item) => item.category === "bestsellers"
        )
    );

    const categories = useSelector((state) =>
        state.products.products.filter((item) => item.category === "categories")
    );

    return (
        <>
            <h1 className={"hide-vis"}>Online market Nimes</h1>
            <div className={classes["wrap"]}>
                <PageContainer addClass={classes["content"]}>
                    <div className={classes["grid"]}>
                        <div className={classes["main-nav"]}>
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
