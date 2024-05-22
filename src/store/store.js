import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from "@reduxjs/toolkit";


const roleSlice = createSlice({
    name: 'role',
    initialState: 'buyer',
    reducers: {
        setAdmin() {
            return 'admin';
        },
        setOwner(){
            return 'owner';
        }
    }
})


export const setAdmin = roleSlice.actions.setAdmin;
export const setOwner = roleSlice.actions.setOwner;

export const role = (state) => state.role;

export const store = configureStore({
    reducer: {
        role: roleSlice.reducer
    },
})