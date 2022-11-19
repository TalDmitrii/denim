import PageContainer from "../layout/PageContainer/PageContainer";
import ProductsList from "../ProductsList/ProductsList";

const CatalogList = (props) => {
    const { products, addClass } = props;

    return (
        <PageContainer>
            <ProductsList
                title={"Catalog list"}
                titleHidden={true}
                products={products}
                addClass={addClass}
                path={"../../img/"}
            />
            {products.length === 0 && (
                <p>No products with the given parameters.</p>
            )}
        </PageContainer>
    );
};

export default CatalogList;
