import { useState } from "react";

import Popup from "../Popup/Popup";
import Overlay from "../Overlay/Overlay";
import UIButton from "../UIButton/UIButton";
import FieldsetColor from "../FieldsetColor/FieldsetColor";
import FieldsetSize from "../FieldsetSize/FieldsetSize";
import Dropdown from "../Dropdown/Dropdown";
import MultiRange from "../MultiRange/MultiRange";

import classes from "./Filter.module.css";

const Filter = (props) => {
    const [isFilterShown, setIsFilterShown] = useState(false);
    const [chosenColor, setChosenColor] = useState(null);
    const [chosenSize, setChosenSize] = useState(null);

    const products = props.products;
    const minPrice = Math.min(...products.map((item) => +item.price));
    const maxPrice = Math.max(...products.map((item) => +item.price));
    const colors = new Set(
        products.reduce((acc, item) => acc.concat(item.colors), [])
    );
    const sizes = new Set(
        products.reduce((acc, item) => acc.concat(item.sizes), [])
    );

    const filteredItems = [
        ...products
            .filter((item) =>
                chosenColor
                    ? item.colors.includes(chosenColor)
                    : item.colors.length
            )
            .filter((item) =>
                chosenSize ? item.sizes.includes(chosenSize) : item.sizes.length
            ),
    ];

    const filterToggle = () => {
        if (products?.length === 0) return;

        setIsFilterShown((prevState) => !prevState);
    };

    const submitHandler = (evt) => {
        evt.preventDefault();

        if (!(chosenColor || chosenSize)) return;

        props.filterHandler({ color: chosenColor, size: chosenSize });
        setChosenColor(null);
        setChosenSize(null);
        filterToggle();
    };

    const colorChangeHandler = (evt) => {
        const color = evt.target.value;
        setChosenColor(color);
    };

    const sizeChangeHandler = (evt) => {
        const size = evt.target.value;
        setChosenSize(size);
    };

    const btnClasses = `${classes["btn"]} ${
        isFilterShown ? classes["open"] : ""
    }`;

    const btnContent = ` (${filteredItems.length} ${
        filteredItems.length === 1 ? " product" : "products"
    })`;

    const content = (
        <>
            <Overlay onOverlayClick={filterToggle} />
            <Popup addClass={classes["popup"]}>
                <section className={classes["filter"]}>
                    <form className={classes["form"]} onSubmit={submitHandler}>
                        <button className={classes["clear"]} type="reset">
                            Clear all
                        </button>
                        <h2 className={classes["title"]}>Filters</h2>
                        <button
                            className={classes["close"]}
                            onClick={filterToggle}
                            type="button"
                        >
                            Close
                        </button>
                        <div className={classes["fields"]}>
                            <Dropdown
                                addClass={classes["field-wrap"]}
                                contentClass={classes["range-container"]}
                                title="Price"
                            >
                                <label className={classes["range-label"]}>
                                    <span>Price</span>
                                    <MultiRange values={[minPrice, maxPrice]} />
                                </label>
                            </Dropdown>
                            <Dropdown
                                addClass={classes["field-wrap"]}
                                contentClass={classes["field-container"]}
                                title="Color"
                            >
                                <FieldsetColor
                                    colors={[...colors]}
                                    changeHandler={colorChangeHandler}
                                />
                            </Dropdown>
                            <Dropdown
                                addClass={classes["field-wrap"]}
                                contentClass={classes["field-container"]}
                                title="Size"
                            >
                                <FieldsetSize
                                    sizes={[...sizes]}
                                    changeHandler={sizeChangeHandler}
                                />
                            </Dropdown>
                        </div>
                        <UIButton addClass={classes["submit"]} type="submit">
                            Apply
                            {(chosenColor || chosenSize) && btnContent}
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
