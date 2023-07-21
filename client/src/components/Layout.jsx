import React from 'react';
import NavigationBar from './NavigationBar';
import { Outlet } from 'react-router-dom';
import ChatBox from './ChatBox';

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