import { useState } from "react";

import classes from "./ProductSlider.module.css";

const ProductSlider = (props) => {
    const [sliderImages, setSliderImages] = useState([...props.images]);

    const sliderClickHandler = (evt) => {
        const direction = evt.target.dataset?.direction;

        if (!direction) return;

        setSliderImages((prevState) => {
            let newState;

            if (direction === "forward") {
                const activeElem = prevState.slice(-1);
                newState = [...activeElem, ...prevState.slice(0, -1)];
            }

            if (direction === "backward") {
                const activeElem = prevState[0];
                newState = [...prevState.slice(1), activeElem];
            }

            return newState;
        });
    };

    const sliderClasses = `${classes["slider"]}${
        props.addClass ? " " + props.addClass : ""
    }`;

    return (
        <div className={sliderClasses} onClick={sliderClickHandler}>
            <button
                className="hide-mobile"
                type="button"
                aria-label="Go to previous slide"
                data-direction="backward"
            ></button>
            <ul>
                {sliderImages.map((path, index) => (
                    <li key={path}>
                        <img
                            src={path}
                            alt={`Preview ${index + 1}`}
                            width="244"
                            height="310"
                        />
                    </li>
                ))}
            </ul>
            <button
                className="hide-mobile"
                type="button"
                aria-label="Go to next slide"
                data-direction="forward"
            ></button>
        </div>
    );
};

export default ProductSlider;
