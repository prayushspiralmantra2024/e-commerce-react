import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    status : false,
    userData: null,
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signUp:(state,action)=>{
 state.status=action
        },
        setLogin(state, action) {
            state.token = action.payload.token;
            state.userData = action.payload.username;
            state.status = true;
          },
        logout: (state) => {
            state.token = null;
            state.status = false;
            state.userData = null;
        }
     }
})

export const {setLogin,signUp,logout} = authSlice.actions;

export default authSlice.reducer;