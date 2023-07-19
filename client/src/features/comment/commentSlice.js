import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        content: []
    },
    reducers: {
        refreshAllList: (state, actions) => {

        },
        addComment: (state, actions) => {

        },
        updateComment: (state, actions) => {

        },
        removeComment: (state, actions) => {

        }
    }
});

export const {refreshAllList, addComment, updateComment, removeComment} = commentSlice.actions;

export default commentSlice.reducer;