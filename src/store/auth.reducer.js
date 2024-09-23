import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:false,
    userData:null
}

const authSlice = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            // console.log(action.payload.data);
            state.isLoggedIn = true,
            state.userData = action.payload.data
        },
        logout:(state,action)=>{
            state.isLoggedIn = false,
            state.userData = null
        }
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer