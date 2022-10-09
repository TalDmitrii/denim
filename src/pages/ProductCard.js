import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer/PageContainer";

const ProductCard = () => {
    const params = useParams();
    const productID = params.productID;
    const productList = useSelector((state) => state.products.products);
    const product = productList.find((item) => item.id === +productID);

    return (
        <>
            <PageContainer>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <picture>
                    <source
                        media="(min-width: 768px)"
                        srcSet={product.paths.x2}
                    />
                    <img
                        src={product.paths.x1}
                        alt={product.title}
                        width="130"
                        height="160"
                    />
                </picture>
            </PageContainer>
        </>
    );
};

export default ProductCard;
