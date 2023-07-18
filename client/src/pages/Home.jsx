import React, {useEffect, useState} from 'react';
import NavigationBar from '../components/NavigationBar';
import ProductsList from '../components/ProductsList';

const Home = () => {
    const [productsHome, setProductsHome] = useState();

    useEffect(() => {
        const getProductsAPI = async() => {
            const productsRawData = await fetch('/product/all');
            const productsJson = await productsRawData.json();
            setProductsHome(productsJson.products);
        }

        getProductsAPI();
    }, []);

    return (
        <>
            <NavigationBar />
            <ProductsList products={productsHome} productPerRow={4} isAuthor={false} />
        </>
    );
};

export default Home;