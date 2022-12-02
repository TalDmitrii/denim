import React, { Suspense, useEffect, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Loader from "./components/UI/Loader/Loader";

import { displayActions } from "./store/display-mode";
import { debounce } from "./utils/utils";

import classes from "./App.module.css";

const Catalog = React.lazy(() => import("./pages/Catalog"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ProductCard = React.lazy(() => import("./pages/ProductCard"));
const Cart = React.lazy(() => import("./pages/Cart"));

function App() {
    const dispatch = useDispatch();

    const updateDisplayMode = useCallback(() => {
        const displaySize = window.innerWidth;

        displaySize < 768
            ? dispatch(displayActions.setIsMobile(true))
            : dispatch(displayActions.setIsMobile(false));
    }, [dispatch]);

    useEffect(() => {
        updateDisplayMode();
    }, [updateDisplayMode]);

    const windowSizeChangeHandler = debounce(updateDisplayMode);
    window.addEventListener("resize", windowSizeChangeHandler);

    return (
        <div className={classes.app}>
            <div className={classes.sticky}>
                <Header />
            </div>
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
                        <Route path="/cart">
                            <Cart />
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
