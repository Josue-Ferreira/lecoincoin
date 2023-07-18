import React, {useState, useEffect} from 'react';
import NavigationBar from '../components/NavigationBar';
import AddProduct from './AddProduct';
import ProductsList from '../components/ProductsList';
import styled from 'styled-components';

const Title = styled.h2`
    width: 70vw;
    margin: 20px auto;
`;

const MyProducts = () => {
    const [myProducts, setMyProducts] = useState();

    useEffect(() => {
        const getProducts = async() => {
            const productsRawData = await fetch('/product/user');
            const productsJson = await productsRawData.json();
            setMyProducts(productsJson.products);
        }

        getProducts();
    }, []);
    return (
        <>
           <NavigationBar />
           <Title>My Products</Title>
           <ProductsList products={myProducts} productPerRow={1} isAuthor={true} />
           <AddProduct /> 
        </>
    );
};

export default MyProducts;