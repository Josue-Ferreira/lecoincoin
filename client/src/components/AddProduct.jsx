import React, { useState, useEffect, useRef } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Row,
    Col
} from 'reactstrap';
// import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../features/product/productSlice';

// const AddProduct = ({setWarning, product, modify, setModify, setMyProducts}) => {
const AddProduct = ({setWarning, product, modify, setModify}) => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState(product ? product.name : '');
    const [category, setCategory] = useState(product ? product.category : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const [imagePrincipalFile, setImagePrincipalFile] = useState();
    const descriptionRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (descriptionRef.current) {
            descriptionRef.current.style.height = "0px";
            const scrollHeight = descriptionRef.current.scrollHeight + 20;
            descriptionRef.current.style.height = scrollHeight + "px";
        }
      }, [description]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let imagePrincipalCloud;
            const urlPost = '/product/add-new';
            const urlPut = product ? `/product/${product.id}` : null;
            if(imagePrincipalFile){
                const formData = new FormData();
                formData.append('file', imagePrincipalFile);
                formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
                const responseCloud = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,{
                    method: 'POST',
                    body: formData
                });
                if(responseCloud.ok){
                    const responseCloudJSON = await responseCloud.json();
                    imagePrincipalCloud = responseCloudJSON.public_id;
                }else{
                    throw new Error('Cloudinary: An error has occured: '+responseCloud.status);
                }
            }
            const responseDB = await fetch(modify == true ? urlPut : urlPost, {
                method: modify == true ? 'PUT' : 'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({"name": productName, "price": price, "description": description, "category": category, "image_url": imagePrincipalCloud})
            });
            if(responseDB.ok){
                const responseDBJSON = await responseDB.json();
                if(!modify){
                    dispatch(addProduct(responseDBJSON.product))
                    navigate('/product/'+responseDBJSON.product.id);
                }
                else{
                    setModify(false);
                    // setMyProducts(previous => previous.map(element => responseDBJSON.product.id == element.id ? responseDBJSON.product : element));
                    dispatch(updateProduct(responseDBJSON.product));
                }
            }else{
                throw new Error('An error has occured: '+responseDB.status);
            }
        }catch(e){
            console.error(e);
            setWarning(true);
        }
    }

    return (
        <>
            <Form
                style={{
                    margin: '20px auto'
                }}

                onSubmit={handleSubmit}
            >
                <Row xs="4">
                    <Col>
                        <FormGroup>
                            <Label for="name">
                                Product Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="ex : bike"
                                type="text"
                                value={productName}
                                onChange={e => setProductName(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="category">
                                Category
                            </Label>
                            <Input
                                id="category"
                                name="category"
                                placeholder="ex : transport"
                                type="text"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="price">
                                Price
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                placeholder="ex : 100€"
                                type="text"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup >
                            <Label for="imagePrincipal">
                                Image
                            </Label>
                            <Input
                                id="imagePrincipal"
                                name="imagePrincipal"
                                type="file"
                                onChange={e => setImagePrincipalFile(e.target.files[0])}
                                required={product ? false : true}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="description">
                        Description
                    </Label>
                    <Input
                        id="description"
                        name="description"
                        placeholder="ex : white urban bike"
                        type="textarea"
                        value={description}
                        innerRef={descriptionRef}
                        onChange={e => setDescription(e.target.value)}
                        style={{resize: 'none'}}
                        required
                    />
                </FormGroup>
                <Button type='submit' color='primary' >
                    Submit
                </Button>
                {
                    modify && (
                        <Button onClick={() => setModify(false)} color='danger' style={{marginLeft: '10px'}}>
                            Cancel
                        </Button>
                    )
                }
            </Form>
        </>
    );
};

export default AddProduct;