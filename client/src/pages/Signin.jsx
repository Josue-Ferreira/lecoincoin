import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import styled from 'styled-components';
import {
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Button
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { logIn } from '../features/user/userSlice';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 50vh; */
    width: 50vw;
    margin: auto;
    justify-content: center;
`;

const ContainerSignUp = styled.div`
    border-top: solid lightgrey 2px;
    margin: 5vh 0;
    padding: 10px;
    text-align: center;
`;

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validCredentials, setValidCredentials] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignIn = async() => {
        const responseDB = await fetch('/user/signin',{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({"email": email, "password": password})
        });
        if(responseDB.status == 200){
            const responseJson = await responseDB.json();
            dispatch(logIn(responseJson.user));
            setValidCredentials(true);
            navigate('/');
        }
        else{
            setValidCredentials(false);
        }
            
    }

    return (
        <>
            <NavigationBar />
            <Container>
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
                        className={validCredentials ? '' : 'is-invalid'}
                    />
                    <FormFeedback invalid='true' >
                        Invalid email or password
                    </FormFeedback>
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
                        className={validCredentials ? '' : 'is-invalid'}
                    />
                    <FormFeedback invalid='true' >
                        Invalid email or password
                    </FormFeedback>
                </FormGroup>
                <Button 
                    color='primary'
                    onClick={handleSignIn}
                    >
                        Sign In
                </Button>
                <ContainerSignUp>
                    Create an account
                </ContainerSignUp>
                <Button tag={Link} to='/sign-up' >
                    Sign Up
                </Button>
            </Container>
        </>
    );
};

export default Signin;