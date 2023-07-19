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
import { fetchGet } from '../helpers/fetchBack';

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
    const [warning, setWarning] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async() => {
            const json = await fetchGet('/product/user');
            dispatch(refreshAllList(json.products));
            dispatch(setAuthor(true));
        }

        getProducts();
    }, []);

    return (
        <>
           <NavigationBar />
           <PageContainer>
                <Title>My Products</Title>
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