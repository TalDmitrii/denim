import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { filterActions } from "../../../store/filter";
import usePrevious from "../../../hooks/use-previous";

import classes from "./FilterMarkers.module.css";

const FilterMarkers = (props) => {
    const dispatch = useDispatch();
    const { color, size, minPrice, maxPrice, filterHandler } = props;
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [markerState, setMarkerState] = useState(false);
    const prevMarkerState = usePrevious(markerState);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        // Call refresh URL on markerState changes only,
        // to prevent unnecessary push to history
        if (prevMarkerState === markerState) return;
        filterHandler();
    }, [filterHandler, markerState, prevMarkerState, isFirstRender]);

    const removeColorHandler = () => {
        dispatch(filterActions.setColor(null));
        setMarkerState((prevState) => !prevState);
    };

    const removeSizeHandler = () => {
        dispatch(filterActions.setSize(null));
        setMarkerState((prevState) => !prevState);
    };

    const removeMinPriceHandler = () => {
        dispatch(filterActions.setMinPrice(null));
        setMarkerState((prevState) => !prevState);
    };

    const removeMaxPriceHandler = () => {
        dispatch(filterActions.setMaxPrice(null));
        setMarkerState((prevState) => !prevState);
    };

    return (
        <ul className={classes["filter-indicators"]}>
            {color && (
                <li>
                    <button
                        className={classes["btn-color"]}
                        type="button"
                        aria-label={`Remove ${color} color filter`}
                        data-color={color}
                        onClick={removeColorHandler}
                    >
                        Color: {`${color}`}
                        <b></b>
                    </button>
                </li>
            )}
            {size && (
                <li>
                    <button
                        className={classes["btn-size"]}
                        type="button"
                        aria-label={`Remove ${size} size filter`}
                        data-color={size}
                        onClick={removeSizeHandler}
                    >
                        Size: <span>{`${size}`}</span>
                        <b></b>
                    </button>
                </li>
            )}
            {!!minPrice && (
                <li>
                    <button
                        type="button"
                        aria-label={`Remove ${minPrice} min price filter`}
                        data-color={minPrice}
                        onClick={removeMinPriceHandler}
                    >
                        Min price: {`${minPrice}`} $<b></b>
                    </button>
                </li>
            )}
            {!!maxPrice && (
                <li>
                    <button
                        type="button"
                        aria-label={`Remove ${maxPrice} max price filter`}
                        data-color={maxPrice}
                        onClick={removeMaxPriceHandler}
                    >
                        Max price: {`${maxPrice}`} $<b></b>
                    </button>
                </li>
            )}
        </ul>
    );
};

export default FilterMarkers;
