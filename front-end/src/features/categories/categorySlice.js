import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getProducts = createAsyncThunk("category/getProducts", () => {
    return fetch("/productsinfo")
        .then((response) => {
            if (!response.ok) {

                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => data);
});

const initialState = {
    data: [],
    filteredData : [],
    loading: false,
    hasErrors: false,

};
export const category_Slice = createSlice({

    name: "category",
    initialState,
    reducers: {
        // FILTER SPECIFIC PRODUCT BY CATEGORY

        filterByCategory(state, action) {

            let items = state.data.slice()
            const result = items?.filter(curData => {
                
                return curData.category === action.payload
            }
           
        )
        state.filteredData = result
           
           
        }
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.loading = true;
        },
        [getProducts.rejected]: (state, action) => {
            state.loading = false;
            state.hasErrors = action.error.message;
        },
        [getProducts.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.loading = false;
        },
    },


})
export const { filterByCategory } = category_Slice.actions
export default category_Slice.reducer