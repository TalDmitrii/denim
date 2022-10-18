import { useState } from "react";

import Popup from "../Popup/Popup";
import Overlay from "../Overlay/Overlay";
import UIButton from "../UIButton/UIButton";
import FieldsetColor from "../FieldsetColor/FieldsetColor";
import FieldsetSize from "../FieldsetSize/FieldsetSize";
import Dropdown from "../Dropdown/Dropdown";
import MultiRange from "../MultiRange/MultiRange";

import classes from "./Filter.module.css";

const colors = ["turquoise", "blue", "grey", "black", "bluelight"];
const sizes = ["xs", "s", "m", "l", "xl"];

const Filter = () => {
    const [isFilterShown, setIsFilterShown] = useState(false);

    const filterToggle = () => {
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
                                    <MultiRange values={[0, 1000]} />
                                </label>
                            </Dropdown>
                            <Dropdown
                                addClass={classes["field-wrap"]}
                                contentClass={classes["field-container"]}
                                title="Color"
                            >
                                <FieldsetColor colors={colors} />
                            </Dropdown>
                            <Dropdown
                                addClass={classes["field-wrap"]}
                                contentClass={classes["field-container"]}
                                title="Size"
                            >
                                <FieldsetSize sizes={sizes} />
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
