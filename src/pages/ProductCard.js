import { useParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer/PageContainer";

const productList = [
    {
        id: 1,
        title: "Jacket",
        price: 120,
        paths: {
            x1: "../bestsellers/1.jpg",
            x2: "../bestsellers/1-2x.jpg",
        },
        description: "Gorgeous jacket is the latest trend",
    },
    {
        id: 2,
        title: "Overalls",
        price: 140,
        paths: {
            x1: "../bestsellers/2.jpg",
            x2: "../bestsellers/2-2x.jpg",
        },
        description: "Gorgeous jacket is the latest trend",
    },
    {
        id: 3,
        title: "Jacket",
        price: 90,
        paths: {
            x1: "../bestsellers/3.jpg",
            x2: "../bestsellers/3-2x.jpg",
        },
        description: "Nice pants on stock",
    },
    {
        id: 4,
        title: "Overalls",
        price: 160,
        paths: {
            x1: "../bestsellers/4.jpg",
            x2: "../bestsellers/4-2x.jpg",
        },
        description: "Nice pants on stock",
    },
];

const ProductCard = () => {
    const params = useParams();
    const productID = params.productID;
    const product = productList.find((item) => item.id === +productID);

    return (
        <>
            <PageContainer>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
            </PageContainer>
        </>
    );
};

export default ProductCard;
