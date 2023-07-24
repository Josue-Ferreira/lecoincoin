import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        discussions: []
    },
    reducers:{
        createNewDiscussion: (state, action) => {

        },
        addNewMsgToDiscussion: (state, action) => {

        }
    }
});

export const {createNewDiscussion, addNewMsgToDiscussion} = messageSlice.actions;

export default messageSlice.reducer;