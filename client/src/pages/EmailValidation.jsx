import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/Navbar/NavigationBar';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 5vh auto;
`;

const EmailValidation = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const [messageContent, setMessageContent] = useState('Please wait');

    useEffect(() => {
        const sendEmailTokenValidation = async() => {
            const responseDB = await fetch('/user/signup-validation/'+queryParams.get('token'));
            if(responseDB.status == 200)
                setMessageContent('Your email has been verified successfully. You can log in now !');
            else
                setMessageContent('Invalid URL or email already verified')
        }

        sendEmailTokenValidation();

        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <NavigationBar />
            <Container>
                <h3>
                    {messageContent}
                </h3>  
            </Container>
        </>
    );
};

export default EmailValidation;