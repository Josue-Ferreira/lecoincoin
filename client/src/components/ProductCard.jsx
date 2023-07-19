import React, {useState} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Popover,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {AdvancedImage} from "@cloudinary/react";
import {CloudinaryImage} from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import {BsThreeDots} from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../features/product/productSlice';

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const ProductCard = ({product, setModify}) => {
    const myImage = new CloudinaryImage(product.image_url, {cloudName: process.env.REACT_APP_CLOUDINARY_NAME}).resize(fill().height(100));
    const [isOpenProductActions, setIsOpenProductActions] = useState(false);
    const isAuthor = useSelector(state => state.products.isAuthor);
    const dispatch = useDispatch();

    const handleDelete = async() => {
        const responseDB = await fetch(`/product/${product.id}`,{
            method: 'DELETE'
        });
        if(responseDB.status == 200){
            dispatch(removeProduct(product));
        }
    }
    
    return (
        <Card style={isAuthor ? {margin: '10px'} : {height: '17rem', margin: '10px'}}>
            <ImageContainer>
                <AdvancedImage cldImg={myImage} />
                {isAuthor && (
                    <>
                        <Button 
                            outline 
                            id={`productActions${product.id}`} 
                            style={{margin: '2px', padding: '0 4px', border: 'none', position: 'absolute', right: '0', top: '0'}}
                        >
                            <BsThreeDots />
                        </Button>
                        <Popover
                            target={`productActions${product.id}`}
                            placement="bottom"
                            trigger="focus"
                            isOpen={isOpenProductActions}
                            toggle={() => setIsOpenProductActions(!isOpenProductActions)}
                        >
                            <ListGroup flush>
                                <ListGroupItem
                                    action
                                    tag="button"
                                    onClick={() => setModify(true)}
                                    style={{borderRadius: '20px 20px 0 0'}}
                                >
                                    Modify
                                </ListGroupItem>
                                <ListGroupItem
                                    action
                                    tag="button"
                                    onClick={handleDelete}
                                    style={{borderRadius: '0 0 20px 20px'}}
                                >
                                    Delete
                                </ListGroupItem>
                            </ListGroup>
                        </Popover> 
                    </>
                )}
            </ImageContainer>
            <CardBody style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                    <CardTitle tag="h6">
                        {product.name}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        >
                        {product.category}
                    </CardSubtitle>
                    <CardText>
                        {product.price}€
                    </CardText>
                </div>
                {
                    isAuthor && (
                        <CardText style={{marginTop: '20px'}}>
                            {product.description}
                        </CardText>
                    )
                }
                <Button 
                    color={"success"}
                    tag={Link}
                    to={'/product/'+product.id}
                    style={{alignSelf: 'end'}}
                    >
                    Show more
                </Button>
            </CardBody>
        </Card>
    );
};

export default ProductCard;