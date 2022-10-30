import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { filterActions } from "../../../store/filter";

import classes from "./FilterMarkers.module.css";

const FilterMarkers = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const queryColor = queryParams.get("color");
    const querySize = queryParams.get("size");
    const queryMinPrice = +queryParams.get("minPrice"); // ????
    const queryMaxPrice = +queryParams.get("maxPrice");

    const removeColorHandler = () => {
        dispatch(filterActions.setColor(null));
        props.clickHandler();
    };

    const removeSizeHandler = () => {
        dispatch(filterActions.setSize(null));
        props.clickHandler();
    };

    const removeMinPriceHandler = () => {
        dispatch(filterActions.setMinPrice(null));
        props.clickHandler();
    };

    const removeMaxPriceHandler = () => {
        dispatch(filterActions.setMaxPrice(null));
        props.clickHandler();
    };

    return (
        <ul className={classes["filter-indicators"]}>
            {queryColor && (
                <li>
                    <button
                        className={classes["btn-color"]}
                        type="button"
                        aria-label={`Remove ${queryColor} color filter`}
                        data-color={queryColor}
                        onClick={removeColorHandler}
                    >
                        Color: {`${queryColor}`}
                        <b></b>
                    </button>
                </li>
            )}
            {querySize && (
                <li>
                    <button
                        className={classes["btn-size"]}
                        type="button"
                        aria-label={`Remove ${querySize} size filter`}
                        data-color={querySize}
                        onClick={removeSizeHandler}
                    >
                        Size: <span>{`${querySize}`}</span>
                        <b></b>
                    </button>
                </li>
            )}
            {!!queryMinPrice && (
                <li>
                    <button
                        type="button"
                        aria-label={`Remove ${queryMinPrice} min price filter`}
                        data-color={queryMinPrice}
                        onClick={removeMinPriceHandler}
                    >
                        Min price: {`${queryMinPrice}`} $<b></b>
                    </button>
                </li>
            )}
            {!!queryMaxPrice && (
                <li>
                    <button
                        type="button"
                        aria-label={`Remove ${queryMaxPrice} max price filter`}
                        data-color={queryMaxPrice}
                        onClick={removeMaxPriceHandler}
                    >
                        Max price: {`${queryMaxPrice}`} $<b></b>
                    </button>
                </li>
            )}
        </ul>
    );
};

export default FilterMarkers;
