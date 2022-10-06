import MainNavigation from "../MainNavigation/MainNavigation";

const Menu = (props) => {
    return (
        <div onClick={props.onCloseHandler}>
            <button aria-label="Close menu">Close menu</button>
            <MainNavigation />
        </div>
    );
};

export default Menu;
