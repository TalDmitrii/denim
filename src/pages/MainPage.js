import MainNavigation from "../components/layout/MainNavigation/MainNavigation";
import UserNavigation from "../components/layout/UserNavigation/UserNavigation";

import classes from "./MainPage.module.css";

import New from "../components/New/New";
import Social from "../components/Social/Social";
import ProductsList from "../components/ProductsList/ProductsList";
import Colloection from "../components/Collection/Collection";

const bestsellers = [
    {
        id: 1,
        title: "Jacket",
        price: 120,
        paths: {
            x1: "../bestsellers/1.jpg",
            x2: "../bestsellers/1-2x.jpg",
        },
    },
    {
        id: 2,
        title: "Overalls",
        price: 140,
        paths: {
            x1: "../bestsellers/2.jpg",
            x2: "../bestsellers/2-2x.jpg",
        },
    },
    {
        id: 3,
        title: "Jacket",
        price: 90,
        paths: {
            x1: "../bestsellers/3.jpg",
            x2: "../bestsellers/3-2x.jpg",
        },
    },
    {
        id: 4,
        title: "Overalls",
        price: 160,
        paths: {
            x1: "../bestsellers/4.jpg",
            x2: "../bestsellers/4-2x.jpg",
        },
    },
];

const MainPage = () => {
    return (
        <>
            <div className={classes["main-page__wrap"]}>
                <div
                    className={`page-container ${classes["main-page__content"]}`}
                >
                    <h1 className={"hide-vis"}>Online market Nimes</h1>
                    <div className={classes["main-page__grid"]}>
                        <div className={classes["main-page__main-nav"]}>
                            <MainNavigation
                                addClass={"main-navigation--page"}
                            />
                        </div>
                        <div className={classes["main-page__user-nav"]}>
                            <UserNavigation
                                addClass={"user-navigation--main-page"}
                            />
                        </div>
                        <div className={classes["main-page__new"]}>
                            <New />
                        </div>
                        <button
                            className={classes["main-page__quick-nav"]}
                            type="button"
                            aria-label="Scroll to next section"
                        >
                            <span></span>
                        </button>
                        <div className={classes["main-page__social"]}>
                            <Social />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`page-container ${classes["main-page__bestsellers"]}`}
            >
                <ProductsList
                    title={"Bestsellers"}
                    viewAllHref={"/catalog/bestsellers"}
                    products={bestsellers}
                />
            </div>
            <div
                className={`page-container ${classes["main-page__collection"]}`}
            >
                <Colloection />
            </div>
        </>
    );
};

export default MainPage;
