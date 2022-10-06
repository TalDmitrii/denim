import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import classes from "./App.module.css";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

const Catalog = React.lazy(() => import("./pages/Catalog"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ProductCard = React.lazy(() => import("./pages/ProductCard"));

function App() {
    return (
        <div className={classes.app}>
            <Header />
            <main className={classes.main}>
                <Suspense fallback="loading">
                    <Switch>
                        <Route path="/" exact>
                            <MainPage />
                        </Route>
                        <Route path="/catalog" exact>
                            <Catalog />
                        </Route>
                        <Route path="/product/:productID">
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
