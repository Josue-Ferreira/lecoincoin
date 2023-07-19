import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        content: [],
        isAuthor: false // define if list of products owns to user logged for MyProducts page
    },
    reducers: {
        refreshAllList: (state, action) => {
            state.content = action.payload;
        },
        addProduct: (state, action) => {
            state.content.push(action.payload);
        },
        updateProduct: (state, action) => { // action.payload = réponse de la db avec le produit mis à jour
            state.content = state.content.map(element => action.payload.id == element.id ? action.payload : element);
        },
        removeProduct: (state, action) => {  // action.payload = product
            state.content = state.content.filter(element => action.payload.id != element.id);
        },
        setAuthor: (state, action) => {
            state.isAuthor = action.payload;
        }
    }
});

export const {refreshAllList, addProduct, updateProduct, removeProduct, setAuthor} = productSlice.actions;

export default productSlice.reducer;