import classes from "./Social.module.css";

const Social = () => {
    return (
        <ul className={`${classes["social"]}`}>
            <li>
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Instagram
                </a>
            </li>
            <li>
                <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Facebook
                </a>
            </li>
        </ul>
    );
};

export default Social;
