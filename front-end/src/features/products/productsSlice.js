import { createSlice } from '@reduxjs/toolkit'
export const products_Slice = createSlice({
   name:"products",
   initialState:{
       products:[],
       nextStart : 0,
       totalProducts : 0,
       isLoading : 0,
       isProductsLoaded: null,
       
   },
   reducers:{
       setProducts(state, action){
           state.products = [...state.products, ...action.payload]
           state.isProductsLoaded = true
        },
       
        
       
        setNextStart(state, action){},
        setTotalProducts(state, action){}
        
    }
})
export const {setProducts } = products_Slice.actions
export default products_Slice.reducer