import UILink from "../UI/UILink/UILink";

import classes from "./Collection.module.css";

import imgMobile from "../../images/collection/mobile.jpg";
import imgMobile2x from "../../images/collection/mobile@2x.jpg";
import imgTablet from "../../images/collection/tablet.jpg";
import imgTablet2x from "../../images/collection/tablet@2x.jpg";
import imgDesktop from "../../images/collection/desktop.jpg";
import imgDesktop2x from "../../images/collection/desktop@2x.jpg";

const Colloection = () => {
    return (
        <section className={classes["collection"]}>
            <div className={classes["collection__wrap"]}>
                <h2 className={classes["collection__title"]}>
                    <span>Street fashion collection</span>
                    <b>Fall 2022</b>
                </h2>
                <UILink to="/catalog/new">Shop now</UILink>
            </div>
            <picture>
                <source
                    media="(min-width: 1024px)"
                    srcSet={`${imgDesktop} 1x, ${imgDesktop2x} 2x,`}
                />
                <source
                    media="(min-width: 768px)"
                    srcSet={`${imgTablet} 1x, ${imgTablet2x} 2x,`}
                />
                <img
                    srcSet={`${imgMobile} 1x, ${imgMobile2x} 2x,`}
                    alt="Street fashion collection"
                    width="320"
                    height="226"
                />
            </picture>
        </section>
    );
};

export default Colloection;
