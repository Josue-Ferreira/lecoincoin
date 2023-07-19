import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        content: []
    },
    reducers: {
        refreshAllList: (state, action) => { // action.payload = array of comments
            state.content = action.payload;
        },
        addComment: (state, action) => { // action.payload = comment
            state.content.push(action.payload);
        },
        updateComment: (state, action) => { // action.payload = comment
            state.content = state.content.map(element => action.payload.id == element.id ? action.payload : element);
        },
        removeComment: (state, action) => { // action.payload = comment
            state.content = state.content.filter(element => action.payload.id != element.id);
        }
    }
});

export const {refreshAllList, addComment, updateComment, removeComment} = commentSlice.actions;

export default commentSlice.reducer;