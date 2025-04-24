import {createSlice,nanoid} from '@reduxjs/toolkit';
import ProductsData from '../../Components/Products/Product'
const initialState={
    cartItems: [],
}

export const CartSlice=createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // debugger
          const itemInCart = state.cartItems.find(
            (item) => item.id === action.payload.id
          );
    
          if (itemInCart) {
            itemInCart.quantity++;
          } else {
            state.cartItems.push({ ...action.payload, quantity: 1 });
          }
          localStorage.setItem("Cart", state.cartItems);
        },
        removeFromCart: (state, action) => {
          const itemInCart = state.cartItems.find(
            (item) => item.id === action.payload
          );
        
          if (itemInCart) {
            if (itemInCart.quantity === 1) {
              state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
              );
            } else {
              itemInCart.quantity--;
            }
          }
        
        
        },
        
      },
});

export const  { addToCart,removeFromCart}=CartSlice.actions
export default CartSlice.reducer