import React from 'react';
import ProductCard from './ProductCard';
import {
    Container,
    Row,
    Col
} from 'reactstrap'

const ProductsList = ({products}) => {
    return (
        <Container>
            <Row xs="4">
                {
                    products && products.map(product => (
                        <Col key={product.id}>
                            <ProductCard product={product} />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
};

export default ProductsList;