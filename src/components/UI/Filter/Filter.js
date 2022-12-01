import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Popup from "../Popup/Popup";
import UIButton from "../UIButton/UIButton";
import FieldsetColor from "../FieldsetColor/FieldsetColor";
import FieldsetSize from "../FieldsetSize/FieldsetSize";
import MultiRange from "../MultiRange/MultiRange";
import Dropdown from "../Dropdown/Dropdown";

import { filterActions } from "../../../store/filter";
import { filterProducts } from "../../../utils/utils";

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

    const {
        color: chosenColor,
        size: chosenSize,
        minPrice: chosenMinPrice,
        maxPrice: chosenMaxPrice,
    } = useSelector((state) => state.filter);

    const filteredItems = filterProducts(
        products,
        chosenColor,
        chosenSize,
        chosenMinPrice,
        chosenMaxPrice
    );

    const resetStates = () => {
        dispatch(filterActions.setColor(null));
        dispatch(filterActions.setSize(null));
        dispatch(filterActions.setMinPrice(null));
        dispatch(filterActions.setMaxPrice(null));
    };

    const filterShownToggle = () => {
        if (products?.length === 0) return;

        setIsFilterShown((prevState) => !prevState);
    };

    const submitHandler = (evt) => {
        evt.preventDefault();

        props.filterHandler();
        filterShownToggle();
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
        const newMinPrice = prices[0] === minPrice ? null : prices[0];
        const newMaxPrice = prices[1] === maxPrice ? null : prices[1];

        dispatch(filterActions.setMinPrice(newMinPrice));
        dispatch(filterActions.setMaxPrice(newMaxPrice));
    };

    const btnContent = ` (${filteredItems.length} ${
        filteredItems.length === 1 ? " product" : "products"
    })`;

    const isBtnContentShown =
        chosenColor || chosenSize || !!chosenMinPrice || !!chosenMaxPrice;

    const isDropdownRangeOpen = chosenMinPrice || chosenMaxPrice ? true : false;

    return (
        <>
            <button
                className={classes["btn"]}
                type="button"
                onClick={filterShownToggle}
            >
                Filter by
            </button>
            <Popup
                addClass={classes["popup"]}
                isShown={isFilterShown}
                closePopup={filterShownToggle}
                title="Filter"
                description="Apply filters"
            >
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
                            onClick={filterShownToggle}
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
};

export default Filter;
