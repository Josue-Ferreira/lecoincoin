import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from 'reactstrap';
import NavigationBar from '../components/NavigationBar';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Title = styled.h2`
    text-align: center;
    margin: 20px;
`;

const AddProduct = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [imagePrincipalFile, setImagePrincipalFile] = useState();
    const [warning, setWarning] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', imagePrincipalFile);
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
            let imagePrincipalCloud;
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
            const responseDB = await fetch('/product/add-new', {
                method: 'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({"name": productName, "price": price, "description": description, "category": category, "image_url": imagePrincipalCloud})
            });
            if(responseDB.ok){
                const responseDBJSON = await responseDB.json();
                navigate('/product/'+responseDBJSON.productID)
            }else{
                throw new Error('An error has occured: '+responseCloud.status);
            }
        }catch(e){
            console.error(e);
            setWarning(true);
        }
    }

    return (
        <>
            <NavigationBar />
            <Form
                style={{
                    width: '50vw',
                    margin: 'auto'}}

                onSubmit={handleSubmit}
            >
                <Title>Add new product to sell</Title>
                {
                    warning && (
                        <Alert color="danger">
                            Add new product failed
                        </Alert>
                    )
                }
                <FormGroup >
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
                    onChange={e => setDescription(e.target.value)}
                    required
                    />
                </FormGroup>
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
                <FormGroup >
                    <Label for="imagePrincipal">
                    Image
                    </Label>
                    <Input
                    id="imagePrincipal"
                    name="imagePrincipal"
                    type="file"
                    onChange={e => setImagePrincipalFile(e.target.files[0])}
                    required
                    />
                </FormGroup>
                <Button type='submit' color='primary' >
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default AddProduct;