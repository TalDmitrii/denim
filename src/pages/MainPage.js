import MainNavigation from "../components/layout/MainNavigation/MainNavigation";
import UserNavigation from "../components/layout/UserNavigation/UserNavigation";

import classes from "./MainPage.module.css";

import New from "../components/New/New";
import Social from "../components/Social/Social";

const MainPage = () => {
    return (
        <div className={classes["main-page__wrap"]}>
            <div className={`page-container ${classes["main-page__content"]}`}>
                <h1 className={"hide-vis"}>Online market Nimes</h1>
                <div className={classes["main-page__grid"]}>
                    <div className={classes["main-page__main-nav"]}>
                        <MainNavigation addClass={"main-navigation--page"} />
                    </div>
                    <div className={classes["main-page__user-nav"]}>
                        <UserNavigation
                            addClass={"user-navigation--main-page"}
                        />
                    </div>
                    <div className={`${classes["main-page__new"]}`}>
                        <New />
                    </div>
                    <button
                        className={`${classes["main-page__quick-nav"]}`}
                        type="button"
                        aria-label="Scroll to next section"
                    >
                        <span></span>
                    </button>
                    <div className={`${classes["main-page__social"]}`}>
                        <Social />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
