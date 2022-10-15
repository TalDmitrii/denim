const UIButton = (props) => {
    const btnClasses = `button${props.addClass ? " " + props.addClass : ""}`;

    return (
        <button className={btnClasses} type={props.type || "button"}>
            {props.children}
        </button>
    );
};

export default UIButton;
