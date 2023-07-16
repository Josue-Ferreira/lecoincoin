import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from 'reactstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Title = styled.h2`
    text-align: center;
    margin: 20px;
`;

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState(false);
    const [avatarFile, setAvatarFile] = useState();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        let avatar_cloud;
        if(avatarFile){
            const formData = new FormData();
            formData.append('file', avatarFile);
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
            const responseCloud = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,{
                method: 'POST',
                body: formData
            });
            if(responseCloud.ok){
                const responseCloudJSON = await responseCloud.json();
                avatar_cloud = responseCloudJSON.public_id;
            }
        }
        const responseDB = await fetch('/user/signup',{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({"firstname": firstName, "lastname": lastName, "email": email, "password": password, "avatar_cloud": avatar_cloud, "signup": "true"})
        });
        if(responseDB.status == 200){
            setWarning(false);
            navigate('/sign-up/success');
        }
        else{
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
                <Title>Create an account</Title>
                {
                    warning && (
                        <Alert color="danger">
                            Sign-up failed : try again now or later please
                        </Alert>
                    )
                }
                <FormGroup >
                    <Label for="firstname">
                    Firstname
                    </Label>
                    <Input
                    id="firstname"
                    name="firstname"
                    placeholder="with a placeholder"
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="lastname">
                    Lastname
                    </Label>
                    <Input
                    id="lastname"
                    name="lastname"
                    placeholder="with a placeholder"
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">
                    Email
                    </Label>
                    <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                    Password
                    </Label>
                    <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password placeholder"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    />
                </FormGroup>
                <FormGroup >
                    <Label for="avatar">
                    Avatar
                    </Label>
                    <Input
                    id="avatar"
                    name="avatar"
                    type="file"
                    onChange={e => setAvatarFile(e.target.files[0])}
                    />
                </FormGroup>
                <Button type='submit' color='primary' >
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default Signup;