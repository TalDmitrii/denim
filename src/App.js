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
    // const titleRef = useRef();
    // const descriptionRef = useRef();
    // const priceRef = useRef();
    // const genderMale = useRef();
    // const newRef = useRef();
    // const bestsellerRef = useRef();

    // const sendData = async (evt) => {
    //     evt.preventDefault();

    //     const colors = Array.from(
    //         document.querySelector("#colors").querySelectorAll("input")
    //     )
    //         .filter((input) => input.checked)
    //         .map((item) => item.value);

    //     const sizes = Array.from(
    //         document.querySelector("#sizes").querySelectorAll("input")
    //     )
    //         .filter((input) => input.checked)
    //         .map((item) => item.value);

    //     const product = {
    //         title: titleRef.current.value,
    //         description: descriptionRef.current.value,
    //         price: +priceRef.current.value,
    //         colors: [...colors],
    //         sizes: [...sizes],
    //         gender: genderMale.current.checked ? "male" : "female",
    //         new: newRef.current.checked,
    //         bestseller: bestsellerRef.current.checked,
    //         imagesFolder: 1,
    //     };

    //     const response = await fetch(
    //         "https://denim-1aa45-default-rtdb.firebaseio.com/products.json",
    //         {
    //             method: "POST",
    //             body: JSON.stringify(product),
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     );

    //     const data = await response.json();
    //     console.log(data);

    //     console.log(product);
    // };

    return (
        <div className={classes.app}>
            <div className={classes.sticky}>
                <Header />
            </div>
            {/* <form action="" onSubmit={sendData}>
                <button type="submit">Submit</button>
                <label htmlFor="title">
                    <div>title</div>
                    <input type="text" id="title" ref={titleRef} />
                </label>
                <label htmlFor="description">
                    <div>description</div>
                    <input type="text" id="description" ref={descriptionRef} />
                </label>
                <label htmlFor="price">
                    <div>price</div>
                    <input type="text" id="price" ref={priceRef} />
                </label>
                <fieldset id="colors">
                    <legend>Colors</legend>
                    <label htmlFor="grey">
                        <span>grey</span>
                        <input
                            type="checkbox"
                            name="color"
                            value={"grey"}
                            id="grey"
                        />
                    </label>
                    <label htmlFor="black">
                        <span>black</span>
                        <input
                            type="checkbox"
                            name="color"
                            value={"black"}
                            id="black"
                        />
                    </label>
                    <label htmlFor="turquoise">
                        <span>turquoise</span>
                        <input
                            type="checkbox"
                            name="color"
                            value={"turquoise"}
                            id="turquoise"
                        />
                    </label>
                    <label htmlFor="bluelight">
                        <span>bluelight</span>
                        <input
                            type="checkbox"
                            name="color"
                            value={"bluelight"}
                            id="bluelight"
                        />
                    </label>
                    <label htmlFor="blue">
                        <span>blue</span>
                        <input
                            type="checkbox"
                            name="color"
                            value={"blue"}
                            id="blue"
                        />
                    </label>
                </fieldset>
                <fieldset id="sizes">
                    <legend>Sizes</legend>
                    <label htmlFor="xs">
                        <span>xs</span>
                        <input
                            type="checkbox"
                            name="size"
                            value={"xs"}
                            id="xs"
                        />
                    </label>
                    <label htmlFor="s">
                        <span>s</span>
                        <input type="checkbox" name="size" value={"s"} id="s" />
                    </label>
                    <label htmlFor="m">
                        <span>m</span>
                        <input type="checkbox" name="size" value={"m"} id="m" />
                    </label>
                    <label htmlFor="l">
                        <span>l</span>
                        <input type="checkbox" name="size" value={"l"} id="l" />
                    </label>
                    <label htmlFor="xl">
                        <span>xl</span>
                        <input
                            type="checkbox"
                            name="size"
                            value={"xl"}
                            id="xl"
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Gender</legend>
                    <label htmlFor="male">
                        <span>Male</span>
                        <input
                            type="radio"
                            name="gender"
                            value={"male"}
                            id="male"
                            ref={genderMale}
                        />
                    </label>
                    <label htmlFor="female">
                        <span>Female</span>
                        <input
                            type="radio"
                            name="gender"
                            value={"female"}
                            id="female"
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>New?</legend>
                    <label htmlFor="yes">
                        <span>YES</span>
                        <input
                            type="radio"
                            name="new"
                            value={"yes"}
                            id="yes"
                            ref={newRef}
                        />
                    </label>
                    <label htmlFor="no">
                        <span>NO</span>
                        <input type="radio" name="new" value={"no"} id="no" />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>bestseller?</legend>
                    <label htmlFor="bestselleryes">
                        <span>YES</span>
                        <input
                            type="radio"
                            name="bestseller"
                            value={"yes"}
                            id="bestselleryes"
                            ref={bestsellerRef}
                        />
                    </label>
                    <label htmlFor="bestsellerno">
                        <span>NO</span>
                        <input
                            type="radio"
                            name="bestseller"
                            value={"no"}
                            id="bestsellerno"
                        />
                    </label>
                </fieldset>
            </form> */}
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
