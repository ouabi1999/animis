import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';

const initialCartState = {
  cartItems: []

};
export const cart_Slice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    // add product to the shopping cart
    addToCart(state, action) {

      const cartItems = state.cartItems.slice();
      if (cartItems.find(item => item.id === action.payload.id
        &&
        item.selectedColor === action.payload.selectedColor
        &&
        item.selectedSize === action.payload.selectedSize)) {

        toast.success("Already Shopping Cart!.")

      }



      else {
        toast.success("A new item has been added to your Shopping Cart.")

        cartItems.push({
          ...state.cartItems,

          id: action.payload.id,
          selectedColor: action.payload.selectedColor,
          selectedQuantity: action.payload.selectedQuantity,
          selectedSize: action.payload.selectedSize,
          price: parseInt(action.payload.price),
          subtotal: parseInt(action.payload.price) * action.payload.selectedQuantity,



        })
        state.cartItems = cartItems
        console.log(state.cartItems)
      }

    },

    // remove product to the shopping cart
    removeFromCart(state, product) {
      const cartItems = state.cartItems.slice();

      state.cartItems = cartItems.filter((x, index) => index !== product.payload)


    },
    // addition quantity or subtract quantity
    subtractQuantity(state, action) {
      const cartItems = state.cartItems.slice();
      cartItems.map((item, index) => {
        if (index === action.payload) {
          if (item.selectedQuantity > 1) {
            item.selectedQuantity -= 1
            item.subtotal -= item.price
          }
        }
        state.cartItems = cartItems
      })
    },

    addQuantity(state, action) {
      const cartItems = state.cartItems.slice();
      cartItems.map((item, index) => {
        if (index === action.payload) {
          if (item.selectedQuantity < 5) {
            item.selectedQuantity += 1
            item.subtotal += item.price
            item.price = item.price
          }
        }
        state.cartItems = cartItems
      })
    },


    buyNowItem(state, action) {
      const cartItems = state.cartItems.slice();

      state.cartItems = [{
        ...action.payload,
        price: parseInt(action.payload.price),
        subtotal: parseInt(action.payload.price) * action.payload.selectedQuantity,
        alreadyInCart: true,


      }]






    },
  },

})
export const { removeFromCart, addQuantity, addToCart, buyNowItem, subtractQuantity } = cart_Slice.actions
export default cart_Slice.reducer