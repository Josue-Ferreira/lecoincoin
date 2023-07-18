import React, {useState, useEffect} from 'react';
import NavigationBar from '../components/NavigationBar';
import AddProduct from './AddProduct';
import ProductsList from '../components/ProductsList';

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
           <ProductsList products={myProducts} />
           <AddProduct /> 
        </>
    );
};

export default MyProducts;