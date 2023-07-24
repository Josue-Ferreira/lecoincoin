import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const user = useSelector(state => state.user.profile);

    if(!user){
        return <Navigate to='/' replace />;
    }else{
        return <Outlet />;
    }
};

export default ProtectedRoute;