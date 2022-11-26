import { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./ProductSlider.module.css";

const ProductSlider = (props) => {
    const isMobile = useSelector((state) => state.displayMode.isMobile);
    const [sliderImages, setSliderImages] = useState([...props.images]);

    const sliderBtnClickHandler = (evt) => {
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

    const sliderImageClickHandler = (evt) => {
        const target = evt.target;
        if (isMobile || target.tagName !== "IMG") return;

        const previewIndex = +target.dataset.preview;
        if (previewIndex === 0) return;

        setSliderImages((prevState) => {
            const firstPart = prevState.slice(previewIndex);
            const secondPart = prevState.slice(0, previewIndex);

            return [...firstPart, ...secondPart];
        });
    };

    const sliderClasses = `${classes["slider"]}${
        props.addClass ? " " + props.addClass : ""
    }`;

    return (
        <div className={sliderClasses} onClick={sliderBtnClickHandler}>
            <button
                className="hide-mobile"
                type="button"
                aria-label="Go to previous slide"
                data-direction="backward"
            ></button>
            <ul onClick={sliderImageClickHandler}>
                {sliderImages.map((path, index) => (
                    <li key={path}>
                        <img
                            src={path}
                            alt={`Preview ${index + 1}`}
                            width="244"
                            height="310"
                            data-preview={index}
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
