import advImg from "../../images/products/adv/adv.jpg";

import classes from "./CatalogAdv.module.css";

const CatalogAdv = (props) => {
    return (
        <section className={classes["adv"]}>
            <div className={classes["title-wrap"]}>
                {props.children}
                <h2 className={classes["title"]}>
                    Denim Collection Fall&nbsp;2022
                </h2>
            </div>
            <div className={classes["img-wrap"]}>
                <span className={classes["img-decor"]}></span>
                <span className={classes["img-decor"]}></span>
                <img
                    src={advImg}
                    width="294"
                    height="260"
                    alt="Gorgeous jacket from new collection"
                />
            </div>
        </section>
    );
};

export default CatalogAdv;
