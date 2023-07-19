import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const localUser = JSON.parse(localStorage.getItem('user')); 

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        profile: localUser
    },
    reducers: {
        logIn: (state, action) => {
            state.profile = action.payload;
            localStorage.setItem('user',JSON.stringify(action.payload));
        },
        logOut: (state) => {
            state.profile = null;
            localStorage.removeItem('user');
            Cookies.remove('lecoincoin');
        }
    }
});

export const {logIn, logOut} = userSlice.actions;

export default userSlice.reducer;