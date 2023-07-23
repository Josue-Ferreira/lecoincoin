import React, { useState } from 'react';
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
import { fetchPOST, postImage } from '../helpers/fetchBack';

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
        try {
            const avatar_cloud = avatarFile ? await postImage(avatarFile) : null;
            const json = await fetchPOST('/user/signup', {"firstname": firstName, "lastname": lastName, "email": email, "password": password, "avatar_cloud": avatar_cloud, "signup": "true"});
            setWarning(false);
            navigate('/sign-up/success');
        } catch (e) {
            console.log(e)
            setWarning(true);
        }
    }

    return (
        <>
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