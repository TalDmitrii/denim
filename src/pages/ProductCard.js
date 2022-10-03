import { useParams } from "react-router-dom";

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

const ProductCard = () => {
    const params = useParams();
    const productID = params.productID;
    const product = productList.find((item) => item.id === +productID);

    return (
        <>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
        </>
    );
};

export default ProductCard;
