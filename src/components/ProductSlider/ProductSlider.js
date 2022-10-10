import classes from "./ProductSlider.module.css";

const ProductSlider = (props) => {
    const sliderClasses = `${classes["slider"]}${
        props.addClass ? " " + props.addClass : ""
    }`;

    const product = props.product;

    return (
        <div className={sliderClasses}>
            <button
                className="hide-mobile"
                type="button"
                aria-label="Go to previous slide"
            ></button>
            <ul>
                <li>
                    <picture>
                        <source
                            media="(min-width: 768px)"
                            srcSet={product.paths.x2}
                        />
                        <img
                            src={product.paths.x1}
                            alt={product.title}
                            width="244"
                            height="310"
                        />
                    </picture>
                </li>
                {product.paths.previews.map((previewPath, index) => (
                    <li key={previewPath}>
                        <img
                            src={previewPath}
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
            ></button>
        </div>
    );
};

export default ProductSlider;
