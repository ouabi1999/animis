import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { 
    cartItems:[]

  };
export const cart_Slice = createSlice({
    name:"cart",
    initialState:initialCartState,
    reducers:{
        // add product to the shopping cart
        addToCart(state, action){
            const cartItems = state.cartItems.slice();
            let alreadyInCart = false;
            const already = "already in cart"
            cartItems.map((item) => {
              if (item.id === action.payload.id) {
                item.count++
                item.subtotal += item.price
                alreadyInCart = true;
              }
            });
            if (!alreadyInCart) {
              cartItems.push({ ...action.payload, count: 1, subtotal:action.payload.price })
            }

            state.cartItems = cartItems
            console.log(cartItems)
            
          },

          // remove product to the shopping cart
          removeFromCart(state, product){
            const cartItems = state.cartItems.slice();
            
            state.cartItems = cartItems.filter((x) => x.id !== product.payload.id)
        
           
          },
      // addition quantity or subtract quantity
      subtractQuantity(state, action) {
        const cartItems = state.cartItems.slice();
        cartItems.map(item => {
          if (item.id === action.payload.id) {
            if (item.count > 1) {
              item.count -= 1
              item.subtotal -= item.price
            }
          }
          state.cartItems = cartItems
        })
      }
    },
 })
 export const {removeFromCart, addToCart, subtractQuantity } = cart_Slice.actions
 export default cart_Slice.reducer