import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';

const initialCartState = {
  cartItems: JSON.parse(window.localStorage.getItem("cartItems")) ||[],
  buySingleItem :[]

};
export const cart_Slice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    // add product to the shopping cart
    addToCart(state, action) {

      const cartItems = JSON.parse(window.localStorage.getItem("cartItems")) || [];
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

          id: action.payload.id,
          shippingInfo:action.payload.shippingInfo,
          selectedColor: action.payload.selectedColor,
          selectedQuantity: action.payload.selectedQuantity,
          selectedSize: action.payload.selectedSize,
          price: parseInt(action.payload.price),
          subtotal: parseInt(action.payload.price) * action.payload.selectedQuantity,



        })
        state.cartItems = cartItems
        window.localStorage.setItem("cartItems", JSON.stringify(cartItems))
      }

    },

    // remove product to the shopping cart
    removeFromCart(state, product) {
      const cartItems = JSON.parse(window.localStorage.getItem("cartItems"));

      state.cartItems = cartItems.filter((x, index) => index !== product.payload) 
      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems))


    },
    // addition quantity or subtract quantity
    subtractQuantity(state, action) {
      const cartItems = JSON.parse(window.localStorage.getItem("cartItems"));
      state.cartItems.map((item, index) => {
        if (index === action.payload) {
          if (item.selectedQuantity > 1) {
            item.selectedQuantity -= 1
            item.subtotal -= item.price
          }
        }
        state.cartItems = cartItems
        window.localStorage.setItem("cartItems", JSON.stringify(cartItems))
      })
    },

    addQuantity(state, action) {
      const cartItems = JSON.parse(window.localStorage.getItem("cartItems"));
      cartItems.map((item, index) => {
        if (index === action.payload) {
          if (item.selectedQuantity < 5) {
            item.selectedQuantity += 1
            item.subtotal += item.price
            item.price = item.price
          }
        }
        state.cartItems = cartItems
        window.localStorage.setItem("cartItems", JSON.stringify(cartItems))
      })
    },


    buyNowItem(state, action) {
      
       console.log(action.payload)
      state.cartItems = [{
        id: action.payload.id,
        shippingInfo:action.payload.shippingInfo,
        selectedColor: action.payload.selectedColor,
        selectedQuantity: action.payload.selectedQuantity,
        selectedSize: action.payload.selectedSize,
        price: parseInt(action.payload.price),
        subtotal: parseInt(action.payload.price) * action.payload.selectedQuantity,
      }]
      
      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems))





    },
  },

})
export const { removeFromCart, addQuantity, addToCart, buyNowItem, subtractQuantity } = cart_Slice.actions
export default cart_Slice.reducer