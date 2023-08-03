import React from 'react';
import ProductCard from './ProductCard';
import {
    Container,
    Row,
    Col
} from 'reactstrap'
import ModifyProductCard from './ModifyProductCard';
import { useSelector } from 'react-redux';

const ProductsList = ({setMyProducts, productPerRow}) => {
    const products = useSelector(state => state.products.content);
    const isAuthor = useSelector(state => state.products.isAuthor);

    return (
        <Container>
            <Row xs="1" sm={productPerRow/2} md={productPerRow}>
                {
                    products && products.map(product => (
                        <Col key={product.id}>
                            {isAuthor ? (<ModifyProductCard product={product} />) : (<ProductCard product={product} />)}
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
};

export default ProductsList;
