import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getProductDetails = createAsyncThunk("product/getProductDetails", (id) => {
    return fetch(`/product/${id}`)
    .then((response) => {
    if (!response.ok){
  
      throw Error(response.statusText);
    }
     return response.json();
    })
    .then((data) => data);
    });

export const productDetails_Slice = createSlice({
   name:"product",
   initialState:{
       product: null,
       isLoaded : false,
       hasError : false
       
   },
   reducers:{
       setProductDetails(state, action){
           state.product = action.payload
          
       }
   },
   extraReducers: {
    [getProductDetails.pending]: (state) => {
    state.isLoaded = true;
    },
    [getProductDetails.rejected]: (state, action) => {
    state.isLoaded = false;
    state.hasError = action.error.message;
    console.log(action.payload)
    },
    [getProductDetails.fulfilled]: (state, { payload }) => {
    state.product = payload;
    state.isLoaded = false;
    

    },
    },

})
export const {setProductDetails } = productDetails_Slice.actions
export default productDetails_Slice.reducer