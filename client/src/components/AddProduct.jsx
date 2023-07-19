import React, { useState, useEffect, useRef } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../features/product/productSlice';
import { fetchPOST, fetchPUT, postImage } from '../helpers/fetchBack';

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
            const imagePrincipalCloud = imagePrincipalFile ? await postImage(imagePrincipalFile) : null;
            console.log(imagePrincipalCloud)
            if(modify){
                const urlPut = `/product/${product.id}`;
                const json = await fetchPUT(urlPut, {"name": productName, "price": price, "description": description, "category": category, "image_url": imagePrincipalCloud});
                setModify(false);
                dispatch(updateProduct(json.product));
            }
            else{
                const urlPost = '/product/add-new';
                const json = await fetchPOST(urlPost, {"name": productName, "price": price, "description": description, "category": category, "image_url": imagePrincipalCloud});
                dispatch(addProduct(json.product));
                navigate('/product/'+json.product.id);
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