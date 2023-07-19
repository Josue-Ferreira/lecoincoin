import React from 'react';
import ProductCard from './ProductCard';
import {
    Container,
    Row,
    Col
} from 'reactstrap'
import ModifyProductCard from './ModifyProductCard';

const ProductsList = ({products, setMyProducts, productPerRow, isAuthor}) => {
    return (
        <Container>
            <Row xs={productPerRow}>
                {
                    products && products.map(product => (
                        <Col key={product.id}>
                            {isAuthor ? (<ModifyProductCard product={product} setMyProducts={setMyProducts} />) : (<ProductCard product={product} />)}
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
};

export default ProductsList;