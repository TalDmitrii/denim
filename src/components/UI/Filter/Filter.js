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
    const products = props.products;

    const minPrice = Math.min(...products.map((item) => +item.price));
    const maxPrice = Math.max(...products.map((item) => +item.price));

    const colors = new Set(
        products.reduce((acc, item) => acc.concat(item.colors), [])
    );

    const sizes = new Set(
        products.reduce((acc, item) => acc.concat(item.sizes), [])
    );

    const filterToggle = () => {
        if (products?.length === 0) return;

        setIsFilterShown((prevState) => !prevState);
    };

    const btnClasses = `${classes["btn"]} ${
        isFilterShown ? classes["open"] : ""
    }`;

    const content = (
        <>
            <Overlay onOverlayClick={filterToggle} />
            <Popup addClass={classes["popup"]}>
                <section className={classes["filter"]}>
                    <form action="" className={classes["form"]}>
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
                                <FieldsetColor colors={[...colors]} />
                            </Dropdown>
                            <Dropdown
                                addClass={classes["field-wrap"]}
                                contentClass={classes["field-container"]}
                                title="Size"
                            >
                                <FieldsetSize sizes={[...sizes]} />
                            </Dropdown>
                        </div>
                        <UIButton addClass={classes["submit"]} type="submit">
                            Apply
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
