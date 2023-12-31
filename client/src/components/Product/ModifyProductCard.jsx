import React, {useState} from 'react';
import ProductCard from './ProductCard';
import AddProduct from './AddProduct';
import {
    Card,
    Alert
} from 'reactstrap';
import styled from 'styled-components';
import {AdvancedImage} from "@cloudinary/react";
import {CloudinaryImage} from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const ModifyProductCard = ({product}) => {
    const [modify, setModify] = useState(false);
    const [warning, setWarning] = useState(false);

    const myImage = new CloudinaryImage(product.image_url, {cloudName: process.env.REACT_APP_CLOUDINARY_NAME}).resize(fill().height(100));

    return (
        <>
            {
                modify ? (
                    <Card style={{padding: '10px'}}>
                        {
                            warning && (
                                <Alert color="danger">
                                    Add new product failed
                                </Alert>
                            )
                        }
                        <ImageContainer>
                            <AdvancedImage cldImg={myImage} />
                        </ImageContainer>
                        <AddProduct setWarning={setWarning} product={product} modify={modify} setModify={setModify} />
                    </Card>
                ):(
                    <ProductCard product={product} setModify={setModify} />
                )
            }
        </>
    );
};

export default ModifyProductCard;