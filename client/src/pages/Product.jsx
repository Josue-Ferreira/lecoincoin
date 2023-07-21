import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {AdvancedImage} from "@cloudinary/react";
import {Cloudinary} from "@cloudinary/url-gen";
import {Button} from 'reactstrap';
import CommentsList from '../components/CommentsList';
import { fetchGet } from '../helpers/fetchBack';

const ProductContainer = styled.div`
    display: flex;
    width: 80%;
    margin: 50px auto;
    justify-content: center;
`;

const Pictures = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
`;

const ProductInfos = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
`;

const Category = styled.h3`
    color: grey;
`;

const SellerContact = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const Product = () => {
    const {productID} = useParams();
    const [product, setProduct] = useState();
    const [imagePrincipal, setImagePrincipal] = useState();
    const [sellerAvatar, setSellerAvatar] = useState();
    const cld = new Cloudinary({
        cloud: {
          cloudName: process.env.REACT_APP_CLOUDINARY_NAME
        }
      }); 

    useEffect(() => {
        const getProduct = async() => {
            const json = await fetchGet('/product/'+productID);
            setProduct(json.product);
            const image = cld.image(json.product.image_url);
            setImagePrincipal(image);
            const seller = cld.image(json.product.avatar_cloud);
            setSellerAvatar(seller);
        }

        getProduct();
    }, []);

    return (
        <>
            {product && (
                <ProductContainer>
                    <Pictures>
                        <AdvancedImage style={{maxWidth: '20vw'}} cldImg={imagePrincipal} />
                    </Pictures>
                    <ProductInfos>
                        <div>
                            <h2>{product.name}</h2>
                            <Category>{product.category}</Category>
                        </div>
                        <p>{product.description}</p>
                        <h4>{product.price}€</h4>
                        <SellerContact>
                            <AdvancedImage cldImg={sellerAvatar} style={{maxHeight: '50px', borderRadius: '50%', marginRight: '10px'}} />
                            <h4 style={{flexGrow: '1'}}>{product.firstname} {product.lastname}</h4>
                            <Button href={"mailto:"+product.email} color='info'>Message to seller</Button>
                        </SellerContact>
                    </ProductInfos>
                </ProductContainer>
            )}
            <CommentsList productID={productID}/>
        </>
    );
};

export default Product;