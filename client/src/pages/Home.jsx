import React, {useEffect, useState} from 'react';
import NavigationBar from '../components/NavigationBar';
import ProductsList from '../components/ProductsList';
import { useDispatch } from 'react-redux';
import {refreshAllList, setAuthor} from '../features/product/productSlice';


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getProductsAPI = async() => {
            const productsRawData = await fetch('/product/all');
            const productsJson = await productsRawData.json();
            dispatch(refreshAllList(productsJson.products));
            dispatch(setAuthor(false));
        }

        getProductsAPI();
    }, []);

    return (
        <>
            <NavigationBar />
            <ProductsList productPerRow={4} />
        </>
    );
};

export default Home;