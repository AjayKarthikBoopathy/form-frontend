import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        getUser : (state, action) => {          
            state.users = action.payload;
        },
        addUser : (state, action) => {
            state.users.push(action.payload)
        },
        updateUser: (state, action) => {
            const updatedUser = action.payload;
            state.users = state.users.map(user =>
                user._id === updatedUser._id ? { ...user, ...updatedUser } : user
            );
        },
        deleteUser: (state, action) => {
            const id = action.payload;
            //console.log(id)
            state.users = state.users.filter(user => user._id !== id);
        },
        
    }
})

export const {getUser, addUser, updateUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;
