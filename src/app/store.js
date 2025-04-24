import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../features/todo/storeSlice'
import reducer from '../features/todo/storeSlice';
import productReducer from '../features/todo/productSlice';
import authReducer from '../features/todo/authSlice';

export const store=configureStore({
    reducer:{
        cart: cartReducer, 
        products: productReducer,
        user : authReducer,
        
    },
    
})