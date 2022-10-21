import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';

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
            console.log(action.payload)
            let alreadyInCart = false;
            cartItems.map((item) => {
              if (item.id === action.payload.id) {
               
                alreadyInCart = true;
                toast.success("Already in cart !")
                state.cartItems = [
                  {
                      ...action.payload,
                      price:parseInt(action.payload.price),
                      subtotal:parseInt(action.payload.price) * action.payload.selectedQuantity ,
                      alreadyInCart:true
                
                }]
                
              }
            });
            
    
            
            if (!alreadyInCart) {
              toast.success("A new item has been added to your Shopping Cart.")
              cartItems.push({ 
                        ...action.payload,
                        price:parseInt(action.payload.price),
                        subtotal:parseInt(action.payload.price) * action.payload.selectedQuantity ,
                        alreadyInCart:true,

                              
                })
                state.cartItems = cartItems
            }
            
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
            if (item.selectedQuantity >1) {
              item.selectedQuantity -= 1
              item.subtotal -= item.price
            }
          }
          state.cartItems = cartItems
        })
      },
      
      addQuantity(state, action) {
        const cartItems = state.cartItems.slice();
        cartItems.map(item => {
          if (item.id === action.payload.id) {
            if (item.selectedQuantity < item.quantity) {
              item.selectedQuantity += 1
              item.subtotal += item.price
              item.price = item.price
            }
          }
          state.cartItems = cartItems
        })
      },

    
    buyNowItem(state, action){
      const cartItems = state.cartItems.slice();

      state.cartItems = [{ 
                    ...action.payload,
                    price:parseInt(action.payload.price),
                    subtotal:parseInt(action.payload.price) * action.payload.selectedQuantity ,
                    alreadyInCart:true,

                          
            }]
      
        

       
       
        
      },
    },
    
 })
 export const {removeFromCart, addQuantity, addToCart, buyNowItem, subtractQuantity } = cart_Slice.actions
 export default cart_Slice.reducer