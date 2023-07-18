import React from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {AdvancedImage} from "@cloudinary/react";
import {CloudinaryImage} from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
`;

const ProductCard = ({product}) => {
    const myImage = new CloudinaryImage(product.image_url, {cloudName: process.env.REACT_APP_CLOUDINARY_NAME}).resize(fill().height(100));
    
    return (
        <Card style={{height: '18rem', margin: '10px'}}>
            <ImageContainer>
                <AdvancedImage cldImg={myImage} />
            </ImageContainer>
            <CardBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                    <CardTitle tag="h6">
                        {product.name}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h7"
                        >
                        {product.category}
                    </CardSubtitle>
                    <CardText>
                        {product.price}€
                    </CardText>
                </div>
                <Button 
                    color={"success"}
                    tag={Link}
                    to={'/product/'+product.id}
                    >
                    Show more
                </Button>
            </CardBody>
        </Card>
    );
};

export default ProductCard;