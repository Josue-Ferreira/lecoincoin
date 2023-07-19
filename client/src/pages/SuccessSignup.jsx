import React, { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 5vh auto;
`;

const SuccessSignup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <NavigationBar />
            <Container>
                <h2>
                    Congratulations !
                </h2>
                <h3>
                    Your account has been activated successfully. You will receive an email to validate your account. Please, click on the link received on email and next you will be able to log in.
                </h3>  
            </Container>
        </>
    );
};

export default SuccessSignup;