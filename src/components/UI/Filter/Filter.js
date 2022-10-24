import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Popup from "../Popup/Popup";
import Overlay from "../Overlay/Overlay";
import UIButton from "../UIButton/UIButton";
import FieldsetColor from "../FieldsetColor/FieldsetColor";
import FieldsetSize from "../FieldsetSize/FieldsetSize";
import MultiRange from "../MultiRange/MultiRange";
import Dropdown from "../Dropdown/Dropdown";

import { filterActions } from "../../../store/filter";

import classes from "./Filter.module.css";

const Filter = (props) => {
    const dispatch = useDispatch();
    const [isFilterShown, setIsFilterShown] = useState(false);
    const products = props.products;

    const minPrice = Math.min(...products.map((item) => +item.price));
    const maxPrice = Math.max(...products.map((item) => +item.price));
    const colors = new Set(
        products.reduce((acc, item) => acc.concat(item.colors), [])
    );
    const sizes = new Set(
        products.reduce((acc, item) => acc.concat(item.sizes), [])
    );

    const chosenColor = useSelector((state) => state.filter.color);
    const chosenSize = useSelector((state) => state.filter.size);
    const chosenMinPrice = useSelector((state) => +state.filter.minPrice);
    const chosenMaxPrice = useSelector((state) => +state.filter.maxPrice);

    const filteredItems = [
        ...products
            .filter((item) =>
                chosenColor
                    ? item.colors.includes(chosenColor)
                    : item.colors.length
            )
            .filter((item) =>
                chosenSize ? item.sizes.includes(chosenSize) : item.sizes.length
            )
            .filter((item) =>
                chosenMinPrice ? item.price >= chosenMinPrice : item.price
            )
            .filter((item) =>
                chosenMaxPrice ? item.price <= chosenMaxPrice : item.price
            ),
    ];

    const resetStates = () => {
        dispatch(filterActions.setColor(null));
        dispatch(filterActions.setSize(null));
        dispatch(filterActions.setMinPrice(null));
        dispatch(filterActions.setMaxPrice(null));
    };

    const filterToggle = () => {
        if (products?.length === 0) return;

        setIsFilterShown((prevState) => !prevState);
    };

    const submitHandler = (evt) => {
        evt.preventDefault();

        props.filterHandler();
        filterToggle();
    };

    const colorChangeHandler = (evt) => {
        const color = evt.target.value;
        dispatch(filterActions.setColor(color));
    };

    const sizeChangeHandler = (evt) => {
        const size = evt.target.value;
        dispatch(filterActions.setSize(size));
    };

    const priceChangeHandler = (prices) => {
        dispatch(filterActions.setMinPrice(prices[0]));
        dispatch(filterActions.setMaxPrice(prices[1]));
    };

    // useEffect(() => {
    //     if (items.length === 0) {
    //         return;
    //     }
    //     setBtnIsHighlighted(true);

    //     const timer = setTimeout(() => {
    //         setBtnIsHighlighted(false);
    //     }, 300);

    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, [items]);

    const btnClasses = `${classes["btn"]} ${
        isFilterShown ? classes["open"] : ""
    }`;

    const btnContent = ` (${filteredItems.length} ${
        filteredItems.length === 1 ? " product" : "products"
    })`;

    const isBtnContentShown =
        chosenColor || chosenSize || !!chosenMinPrice || !!chosenMaxPrice;

    const isDropdownRangeOpen = chosenMinPrice || chosenMaxPrice ? true : false;

    const content = (
        <>
            <Overlay onOverlayClick={filterToggle} />
            <Popup addClass={classes["popup"]}>
                <section className={classes["filter"]}>
                    <form className={classes["form"]} onSubmit={submitHandler}>
                        <button
                            className={classes["clear"]}
                            type="reset"
                            onClick={resetStates}
                        >
                            Clear all
                        </button>
                        <h2 className={classes["title"]}>Filters</h2>
                        <button
                            className={classes["close"]}
                            type="button"
                            onClick={filterToggle}
                        >
                            Close
                        </button>
                        <div className={classes["fields"]}>
                            <Dropdown
                                addClass={classes["field-wrap"]}
                                contentClass={classes["range-container"]}
                                open={isDropdownRangeOpen}
                                title="Price"
                            >
                                <label className={classes["range-label"]}>
                                    <span>Price</span>
                                    <MultiRange
                                        range={[minPrice, maxPrice]}
                                        minValue={chosenMinPrice}
                                        maxValue={chosenMaxPrice}
                                        сhangeHandler={priceChangeHandler}
                                    />
                                </label>
                            </Dropdown>
                            <Dropdown
                                addClass={classes["field-wrap"]}
                                contentClass={classes["field-container"]}
                                open={chosenColor ? true : false}
                                title="Color"
                            >
                                <FieldsetColor
                                    colors={[...colors]}
                                    changeHandler={colorChangeHandler}
                                    checkedColor={chosenColor}
                                />
                            </Dropdown>
                            <Dropdown
                                addClass={classes["field-wrap"]}
                                contentClass={classes["field-container"]}
                                open={chosenSize ? true : false}
                                title="Size"
                            >
                                <FieldsetSize
                                    sizes={[...sizes]}
                                    changeHandler={sizeChangeHandler}
                                    checkedSize={chosenSize}
                                />
                            </Dropdown>
                        </div>
                        <UIButton addClass={classes["submit"]} type="submit">
                            Apply
                            {isBtnContentShown && btnContent}
                        </UIButton>
                    </form>
                </section>
            </Popup>
        </>
    );

    return (
        <>
            <button className={btnClasses} type="button" onClick={filterToggle}>
                Filter by
            </button>
            {isFilterShown && content}
        </>
    );
};

export default Filter;
