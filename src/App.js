import React, { Suspense, useEffect } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productsActions } from "./store/index";

import classes from "./App.module.css";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import PageContainer from "./components/layout/PageContainer/PageContainer";
import Loader from "./components/UI/Loader/Loader";

const Catalog = React.lazy(() => import("./pages/Catalog"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ProductCard = React.lazy(() => import("./pages/ProductCard"));

const bestsellers = [
    {
        id: 1,
        title: "Jacket",
        description: `Gorgeous jacket is the latest trend`,
        price: 40,
        colors: ["turquoise", "blue", "bluelight"],
        sizes: ["xs", "s", "m", "l", "xl"],
        gender: "female",
        new: true,
        bestseller: true,
        paths: {
            x1: "../bestsellers/1.jpg",
            x2: "../bestsellers/1@2x.jpg",
            previews: [
                "../previews/1.jpg",
                "../previews/2.jpg",
                "../previews/3.jpg",
                "../previews/4.jpg",
            ],
        },
    },
    {
        id: 2,
        title: "Overalls",
        description: `Gorgeous Overalls is the latest trend`,
        price: 1400,
        colors: ["turquoise", "blue", "grey", "bluelight"],
        sizes: ["xs", "s", "m", "l"],
        gender: "female",
        new: false,
        bestseller: false,
        paths: {
            x1: "../bestsellers/2.jpg",
            x2: "../bestsellers/2@2x.jpg",
            previews: [
                "../previews/1.jpg",
                "../previews/2.jpg",
                "../previews/3.jpg",
                "../previews/4.jpg",
            ],
        },
    },
    {
        id: 3,
        title: "Jacket",
        description: `Gorgeous Overalls is the latest trend`,
        price: 910,
        colors: ["turquoise", "blue", "grey"],
        sizes: ["xs", "l", "xl"],
        gender: "female",
        new: false,
        bestseller: true,
        paths: {
            x1: "../bestsellers/3.jpg",
            x2: "../bestsellers/3@2x.jpg",
            previews: [
                "../previews/1.jpg",
                "../previews/2.jpg",
                "../previews/3.jpg",
                "../previews/4.jpg",
            ],
        },
    },
    {
        id: 4,
        title: "Overalls",
        description: `Gorgeous Overalls is the latest trend`,
        price: 200,
        colors: ["turquoise", "black", "bluelight"],
        sizes: ["xs", "s", "m", "xl"],
        gender: "female",
        new: false,
        bestseller: false,
        paths: {
            x1: "../bestsellers/4.jpg",
            x2: "../bestsellers/4@2x.jpg",
            previews: [
                "../previews/1.jpg",
                "../previews/2.jpg",
                "../previews/3.jpg",
                "../previews/4.jpg",
            ],
        },
    },
];

const categories = [
    {
        id: 5,
        title: "Jacket",
        description: `Gorgeous Overalls is the latest trend`,
        price: 360,
        colors: ["grey", "black", "bluelight"],
        sizes: ["m", "l", "xl"],
        gender: "female",
        new: true,
        bestseller: true,
        paths: {
            x1: "../categories/1.jpg",
            x2: "../categories/1@2x.jpg",
            previews: [
                "../previews/1.jpg",
                "../previews/2.jpg",
                "../previews/3.jpg",
                "../previews/4.jpg",
            ],
        },
    },
    {
        id: 6,
        title: "Overalls",
        description: `Gorgeous Overalls is the latest trend`,
        price: 140,
        colors: ["turquoise", "blue", "grey", "black"],
        sizes: ["xs", "s", "xl"],
        gender: "male",
        new: true,
        bestseller: false,
        paths: {
            x1: "../categories/2.jpg",
            x2: "../categories/2@2x.jpg",
            previews: [
                "../previews/1.jpg",
                "../previews/2.jpg",
                "../previews/3.jpg",
                "../previews/4.jpg",
            ],
        },
    },
    {
        id: 7,
        title: "Jacket",
        description: `Gorgeous Jacket is the latest trend`,
        price: 90,
        colors: ["blue", "grey", "black"],
        sizes: ["xs", "s", "m"],
        gender: "male",
        new: true,
        bestseller: true,
        paths: {
            x1: "../categories/3.jpg",
            x2: "../categories/3@2x.jpg",
            previews: [
                "../previews/1.jpg",
                "../previews/2.jpg",
                "../previews/3.jpg",
                "../previews/4.jpg",
            ],
        },
    },
    {
        id: 8,
        title: "Overalls",
        description: `Gorgeous Overalls is the latest trend`,
        price: 160,
        colors: ["turquoise", "blue", "grey", "black"],
        sizes: ["xs", "m", "xl"],
        gender: "male",
        new: true,
        bestseller: false,
        paths: {
            x1: "../categories/4.jpg",
            x2: "../categories/4@2x.jpg",
            previews: [
                "../previews/1.jpg",
                "../previews/2.jpg",
                "../previews/3.jpg",
                "../previews/4.jpg",
            ],
        },
    },
];

function App() {
    console.log("App render");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsActions.refreshProducts([...bestsellers]));
    }, [dispatch, bestsellers]);

    useEffect(() => {
        dispatch(productsActions.refreshProducts([...categories]));
    }, [dispatch, categories]);

    return (
        <div className={classes.app}>
            <PageContainer addClass={classes.sticky}>
                <Header />
            </PageContainer>
            <main className={classes.main}>
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <Route path="/" exact>
                            <MainPage />
                        </Route>
                        <Route path="/catalog/categories/:category">
                            <Catalog />
                        </Route>
                        <Route path="/catalog/:productID">
                            <ProductCard />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}

export default App;
