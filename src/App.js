import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import "./App.css";

const MainNavigation = React.lazy(() =>
    import("./components/layout/MainNavigation")
);
const Catalog = React.lazy(() => import("./pages/Catalog"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ProductCard = React.lazy(() => import("./pages/ProductCard"));

function App() {
    return (
        <div className="App">
            <MainNavigation />
            <Suspense fallback="loading">
                <Switch>
                    <Route path="/" exact>
                        <MainPage />
                    </Route>
                    <Route path="/catalog" exact>
                        <Catalog />
                    </Route>
                    <Route path="/product">
                        <ProductCard />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Suspense>
        </div>
    );
}

export default App;
