import React, {useEffect, useState} from 'react';
import ProductsList from '../components/Product/ProductsList';
import { useDispatch } from 'react-redux';
import {refreshAllList, setAuthor} from '../features/product/productSlice';
import { fetchGet } from '../helpers/fetchBack';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getProductsAPI = async() => {
            const json = await fetchGet('/product/all');
            dispatch(refreshAllList(json.products));
            dispatch(setAuthor(false));
        }

        getProductsAPI();
    }, []);

    return (
        <>
            <ProductsList productPerRow={4} />
        </>
    );
};

export default Home;