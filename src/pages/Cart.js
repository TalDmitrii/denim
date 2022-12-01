import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../hooks/use-http";

import Loader from "../components/UI/Loader/Loader";
import PageContainer from "../components/layout/PageContainer/PageContainer";
import CartItem from "../components/CartItem/CartItem";

import { getProducts } from "../libs/api";
import { cartActions } from "../store/cart";

import classes from "./Cart.module.css";
import UIButton from "../components/UI/UIButton/UIButton";

const Cart = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.products);

    const {
        sendRequest,
        status,
        data: products,
        error,
    } = useHttp(getProducts, true);

    useEffect(() => {
        sendRequest({ type: "all" }); //Need to fetch defined products only
    }, [sendRequest]);

    useEffect(() => {
        const footer = document.querySelector(".j-footer");
        if (!footer) return;
        footer.style.paddingBottom = "140px";

        return () => {
            footer.removeAttribute("style");
        };
    }, []);

    const removeFromCartHandler = (evt) => {
        const parent = evt.target.closest("li");
        const localStorageID = parent.dataset.id;

        dispatch(cartActions.removeFromCart(localStorageID));
    };

    let noProducts;

    if (status === "pending") {
        noProducts = <Loader />;
    }

    if (error) {
        noProducts = <p>{error}</p>;
    }

    if (status === "completed" && (!products || products.length === 0)) {
        noProducts = <p>Service not available</p>;
    }

    let content;
    let count;
    let totalPrice;

    if (products && products?.length > 0) {
        const updatedList = cartProducts.map((item) => {
            // Find the obect with full data
            const foundItem = products.find(
                (product) => product.id === item.id
            );
            const title = foundItem.title;
            const description = foundItem.description;
            const price = foundItem.price;
            const imagesFolder = foundItem.imagesFolder;

            return { ...item, title, description, price, imagesFolder };
        });

        if (updatedList.length === 0) {
            content = <p>Your Cart is empty :)</p>;
        }

        if (updatedList.length > 0) {
            count = updatedList.length;
            totalPrice = updatedList.reduce((acc, item) => acc + item.price, 0);

            content = (
                <ul className={classes["list"]}>
                    {updatedList.map((item) => (
                        <CartItem
                            {...item}
                            key={item.localStorageID}
                            removeFromCartHandler={removeFromCartHandler}
                        />
                    ))}
                </ul>
            );
        }
    }

    return (
        <PageContainer>
            <div className={classes["page"]}>
                <div className={classes["header-wrap"]}>
                    <h1 className={classes["header"]}>Cart</h1>
                    {count && <span className={classes["count"]}>{count}</span>}
                </div>
                {content && (
                    <div className={classes["content"]}>
                        <section>
                            <h2 className={"hide-vis"}>Cart list</h2>
                            {content}
                        </section>
                        {totalPrice && (
                            <section className={classes["sidebar"]}>
                                <div className={classes["total"]}>
                                    <div
                                        className={
                                            classes["total__header-wrap"]
                                        }
                                    >
                                        <h2
                                            className={classes["total__header"]}
                                        >
                                            Total
                                        </h2>
                                        <p className={classes["total__price"]}>
                                            {totalPrice} $
                                        </p>
                                    </div>
                                    <UIButton>Buy now</UIButton>
                                </div>
                            </section>
                        )}
                    </div>
                )}
                {noProducts && noProducts}
            </div>
        </PageContainer>
    );
};

export default Cart;
