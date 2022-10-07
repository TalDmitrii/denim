import { NavLink } from "react-router-dom";

// Move from here
import { ReactComponent as IconFB } from "../../../images/svg/social/fb.svg";
import { ReactComponent as IconInst } from "../../../images/svg/social/inst.svg";
import { ReactComponent as IconPint } from "../../../images/svg/social/pint.svg";
import { ReactComponent as IconTw } from "../../../images/svg/social/tw.svg";

import Logo from "../../UI/Icons/Logo";

import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={"page-container"}>
                <ul className={classes.navigation}>
                    <li>
                        <NavLink to="/">
                            <Logo />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="">Sitemap</NavLink>
                    </li>
                    <li>
                        <NavLink to="">Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="">Service</NavLink>
                    </li>
                    <li>
                        <NavLink to="">Delivery</NavLink>
                    </li>
                    <li>
                        <NavLink to="">Contacts</NavLink>
                    </li>
                </ul>
                <ul className={classes.social}>
                    <li>
                        <a href="">
                            <IconFB />
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <IconInst />
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <IconPint />
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <IconTw />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
