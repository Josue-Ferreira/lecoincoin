import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import commentReducer from '../features/comment/commentSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        comments: commentReducer
    }
});