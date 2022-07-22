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
    loading: false,
    hasErrors: false,

};
export const category_Slice = createSlice({

    name: "category",
    initialState,
    reducers: {
        // FILTER SPECIFIC PRODUCT BY CATEGORY

        filterByCategory(state, action) {

            const items = state.data.slice()
            items?.filter(curData => {
                return curData.colors === action.payload;
            })
            state.data = items
            console.log(items)
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