import UILink from "../UI/UILink/UILink";
import newImg from "../../images/products/new/new.jpg";
import classes from "./New.module.css";
import LogoDenim from "../UI/Icons/LogoDenim";

const New = () => {
    return (
        <section className={classes["new"]}>
            <h2 className={"hide-vis"}>New Denim collection</h2>
            <div className={classes["new__img-wrap"]}>
                <img
                    src={newImg}
                    width="202"
                    height="243"
                    alt="Gorgeous jacket from new collection"
                />
            </div>
            <div className={classes["new__text-wrap"]}>
                <p className={classes["new__text"]}>The quality you deserve</p>
                <div className={classes["new__logo-wrap"]}>
                    <LogoDenim />
                </div>
                <UILink to="/catalog/new">Check new collection</UILink>
            </div>
        </section>
    );
};

export default New;
