import UIButton from "../UI/UIButton/UIButton";

import classes from "./LoadMore.module.css";

const LoadMore = (props) => {
    const { shownCount, allCount, loadMoreHandler } = props;
    const progressWidth = (shownCount / allCount) * 100;

    return (
        <div className={classes["load-more"]}>
            <p>
                Showing {shownCount} of {allCount} items
            </p>
            <span className={`hide-mobile ${classes["progress-bar"]}`}>
                <span
                    style={{
                        width: `${progressWidth}%`,
                    }}
                ></span>
            </span>
            <UIButton clickHandler={loadMoreHandler}>Load more</UIButton>
        </div>
    );
};

export default LoadMore;
