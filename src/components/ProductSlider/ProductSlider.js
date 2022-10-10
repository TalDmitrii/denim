import classes from "./ProductSlider.module.css";

const ProductSlider = (props) => {
    const sliderClasses = `${classes["slider"]}${
        props.addClass ? " " + props.addClass : ""
    }`;

    const images = props.images;

    return (
        <div className={sliderClasses} onClick={props.onSliderClick}>
            <button
                className="hide-mobile"
                type="button"
                aria-label="Go to previous slide"
                data-direction="backward"
            ></button>
            <ul>
                {images.map((path, index) => (
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
