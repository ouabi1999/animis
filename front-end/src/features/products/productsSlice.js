import { createSlice } from '@reduxjs/toolkit'
export const products_Slice = createSlice({
   name:"products",
   initialState:{
       products:[],
       isProductsLoaded: null,
       
   },
   reducers:{
       setProducts(state, action){
           state.products = [...state.products, ...action.payload]
           state.isProductsLoaded = true
        }
    }
})
export const {setProducts } = products_Slice.actions
export default products_Slice.reducer