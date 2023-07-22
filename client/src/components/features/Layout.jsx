import React from 'react';
import NavigationBar from '../Navbar/NavigationBar';
import { Outlet } from 'react-router-dom';
import ChatBox from '../Chat/ChatBox';

const Layout = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
            <ChatBox />
        </>
    );
};

export default Layout;