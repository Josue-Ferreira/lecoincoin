import React, {useState, useEffect} from 'react';
import NavigationBar from '../components/NavigationBar';
import AddProduct from '../components/AddProduct';
import ProductsList from '../components/ProductsList';
import styled from 'styled-components';
import {
    Alert
} from 'reactstrap'
import { useDispatch } from 'react-redux';
import { refreshAllList, setAuthor } from '../features/product/productSlice';

const PageContainer = styled.div`
    width: 70vw;
    margin: auto;
`;

const Title = styled.h2`
    margin: 20px auto;
`;

const TitleAdd = styled.h3`
    margin: 20px 0;
`;

const MyProducts = () => {
    // const [myProducts, setMyProducts] = useState();
    const [warning, setWarning] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async() => {
            const productsRawData = await fetch('/product/user');
            const productsJson = await productsRawData.json();
            // setMyProducts(productsJson.products);
            dispatch(refreshAllList(productsJson.products));
            dispatch(setAuthor(true));
        }

        getProducts();
    }, []);

    return (
        <>
           <NavigationBar />
           <PageContainer>
                <Title>My Products</Title>
                {/* <ProductsList products={myProducts} productPerRow={1} isAuthor={true} setMyProducts={setMyProducts} /> */}
                <ProductsList productPerRow={1} />
                <TitleAdd>Add new product to sell</TitleAdd>
                {
                    warning && (
                        <Alert color="danger">
                            Add new product failed
                        </Alert>
                    )
                }
                <AddProduct setWarning={setWarning} /> 
           </PageContainer>
        </>
    );
};

export default MyProducts;