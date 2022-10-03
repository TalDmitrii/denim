import { Link } from "react-router-dom";

const productList = [
    {
        id: 1,
        title: "Gorgeous jacket",
        description: "Gorgeous jacket is the latest trend",
    },
    {
        id: 2,
        title: "Nice pants",
        description: "Nice pants on stock",
    },
];

const Catalog = () => {
    return (
        <>
            <h1>Catalog</h1>
            <ul>
                {productList.map((item) => (
                    <li key={item.id}>
                        <Link to={`/product/${item.id}`}>
                            <h2>{item.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Catalog;
