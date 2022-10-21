import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getCustomers = createAsyncThunk("customers/Customers", () => {
    return fetch("/customers")
        .then((response) => {
            if (!response.ok) {

                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => data);
});

const initialState = {
    customers: [],
    isLoading: false,
    hasError: false,
   

};

export const customers_Slice = createSlice({
    name: "customers",
    initialState,
    reducers: {
       
        
        
    },

    extraReducers: {
        [getCustomers.pending]: (state) => {
            state.isLoading = true;
        },
        [getCustomers.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = action.error.message;
        },
        [getCustomers.fulfilled]: (state, { payload }) => {
            state.customers = payload;
            state.isLoading = false;
            console.log(payload)
           
        },
    },


})
export const {  } = customers_Slice.actions
export default customers_Slice.reducer