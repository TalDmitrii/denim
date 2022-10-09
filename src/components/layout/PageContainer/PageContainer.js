const PageContainer = (props) => {
    const classes = `page-container${
        props.addClass ? " " + props.addClass : ""
    }`;

    return <div className={classes}>{props.children}</div>;
};

export default PageContainer;
