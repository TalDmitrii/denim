import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer/PageContainer";

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
            <PageContainer>
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
            </PageContainer>
        </>
    );
};

export default Catalog;
