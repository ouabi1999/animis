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
    dataList: [],
    filteredData : [],
    loading: false,
    hasErrors: false,
    selectedCategory: null,
    selectedRating : null,
    selectedPrice : [0, 200],
    selectingPrice : null,
    searchInput : "",
    resultsFound: false,
    product_type_list:[
        { id: 1, checked: false, label: 't-shirt' },
        { id: 2, checked: false, label: 'shirt' },
        { id: 3, checked: false, label: 'rings' },
        { id: 4, checked: false, label: 'braclet' },
        { id: 5, checked: false, label: 'key-chain' },
        { id: 6, checked: false, label: 'earring' },
      ],

};

export const category_Slice = createSlice({
    name: "category",
    initialState,
    reducers: {
        // FILTER SPECIFIC PRODUCT BY CATEGORY
        
        
        handleSelectCategory(state, action){
            let updatedList = state.dataList.slice()
            if(!action.payload){
                state.filteredData = JSON.parse(window.localStorage.getItem('filtredData'))
                state.selectedCategory = window.localStorage.getItem('selectedCategory')
            }
            else if(action.payload === "all"){
                
                 state.filteredData = state.dataList
                 state.selectedCategory = "all"
                 window.localStorage.setItem('selectedCategory', action.payload)
                 window.localStorage.setItem('filtredData', JSON.stringify(state.dataList));
            }
            else{
               
                 
                state.selectedCategory = action.payload;
                updatedList = updatedList.filter(
                    (item) => item.category === state.selectedCategory
                )  
                state.filteredData = updatedList  
                window.localStorage.setItem('filtredData', JSON.stringify(updatedList));
                window.localStorage.setItem('selectedCategory', action.payload)
            }

           
        },

        handleChangeChecked(state, action) {
            const product_type_list = state.product_type_list.slice()

            const CheckedProduct_type = product_type_list.map((item) =>
                item.id === action.payload ? { ...item, checked: !item.checked } : item
            );
            state.product_type_list = CheckedProduct_type

            const product_type_checked = state.product_type_list.slice()
                .filter((item) => item.checked)
                .map((item) => item.label.toLowerCase());

            if (product_type_checked.length) {
                state.filteredData = state.dataList.filter((item) =>
                    product_type_checked.includes(item.product_type)
                );
               

            }
            else if(state.selectedCategory === "all"){
                state.filteredData = state.dataList
            }
            else {
               
                state.filteredData = state.dataList.filter(
                    (item) => item.category === state.selectedCategory
                )
              
            }
        },

        handelChangeInput(state, action){
         
            // Search Filter
            state.selectedCategory = "all"
            state.searchInput = action.payload
            state.filteredData = state.dataList.filter(
                (item) => item.title.toLowerCase().search(action.payload.toLowerCase().trim()) !== -1
            );
            window.localStorage.setItem('selectedCategory', "all")
            window.localStorage.setItem('filtredData', JSON.stringify(state.filteredData));

            
          
        },
          
        handleChangePrice(state, action){
            
            state.selectedPrice = action.payload
            state.selectingPrice = true
             // Price Filter
            const minPrice = state.selectedPrice[0];
            const maxPrice = state.selectedPrice[1];
            const filteredData = state.dataList.filter(
                (item) => item.category === state.selectedCategory
            )
            
            state.filteredData = filteredData.filter(
                 (item) => item.price >= minPrice && item.price <= maxPrice
             );
        },

       

       


        applyFilters(state, action){

           let updatedList = state.dataList;
           /*
            // Rating Filter
            if (state.selectedRating) {
              updatedList = updatedList.filter(
                (item) => parseInt(item.rating) === parseInt(state.selectedRating)
              );
            }
              */
            // Category Filter
         /* if (state.selectedCategory === "all"){
                updatedList = state.dataList
                
            }

            else{
                updatedList = updatedList.filter(
                    (item) => item.category === state.selectedCategory
                )       
                
            }*/
            // product type Filter
            const product_type_checked = state.product_type_list.filter((item) => item.checked).map((item) => item.label.toLowerCase());

            if (product_type_checked.length) {

                updatedList = state.dataList.filter((item) =>
                    product_type_checked.includes(item.product_type)
                );
            }
            
            // Price Filter
            const minPrice = state.selectedPrice[0];
            const maxPrice = state.selectedPrice[1];
          
            updatedList = state.filteredData.filter(
                (item) => item.price >= minPrice && item.price <= maxPrice
            );
            
          
            state.filteredData = updatedList;
            

            if (!updatedList.length) {
                state.resultsFound = false
            }
            else {
                state.resultsFound = true
            }

            

        },
        
        
        
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
            state.dataList = payload;
            state.loading = false;
        },
    },


})
export const {  filterByCategory,
                handleSelectCategory,
                handleSelectRating,
                handleChangeChecked,
                handleChangePrice,
                applyFilters,
                handelChangeInput,

             } = category_Slice.actions
export default category_Slice.reducer