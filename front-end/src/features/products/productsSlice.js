import { createSlice } from '@reduxjs/toolkit'
export const products_Slice = createSlice({
   name:"products",
   initialState:{
       products:[],
       isProducts: null,
       
   },
   reducers:{
       setProducts(state, action){
           state.products = action.payload
           state.isProducts = true
       }
   }

})
export const {setProducts } = products_Slice.actions
export default products_Slice.reducer