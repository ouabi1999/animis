import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getProductsDetails = createAsyncThunk("category/getProductsDetails", () => {
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
    isLoading: false,
    hasError: false,
    selectedCategory: null,
    selectedRating : null,
    selectedPrice : [0, 200],
    selectingPrice : null,
    searchInput : "",
    resultsFound: false,
    product_type_list:[
        { id: 1, checked: false, label: 't-shirt'},
        { id: 2, checked: false, label: 'shirt'},
        { id: 3, checked: false, label: 'rings' },
        { id: 4, checked: false, label: 'braclet'},
        { id: 5, checked: false, label: 'key-chain'},
        { id: 6, checked: false, label: 'earring'},
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
                state.filteredData = state.dataList
                state.selectedCategory = window.localStorage.getItem('selectedCategory')
            }
            else if(action.payload === "all"){
                
                 state.filteredData = updatedList
                 state.selectedCategory = "all"
                 window.localStorage.setItem('selectedCategory', action.payload)
            }
            else{

                state.selectedCategory = action.payload;
                updatedList = updatedList.filter(
                    (item) => item.category === state.selectedCategory
                )  
                state.filteredData = updatedList  
             
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
                .filter((item) => item.checked).map((item) => item.label.toLowerCase());

            if (product_type_checked.length) {
                state.filteredData = state.filteredData.filter((item) =>
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
            let updatedList = state.dataList.slice()
            state.searchInput = action.payload
            state.filteredData = updatedList.filter(
                (item) => item.title.toLowerCase().search(action.payload.toLowerCase().trim()) !== -1
            );
            window.localStorage.setItem('selectedCategory', "all")
        },
          
        handleChangePrice(state, action){
            
            state.selectedPrice = action.payload
            state.selectingPrice = true
             // Price Filter
            const minPrice = state.selectedPrice[0];
            const maxPrice = state.selectedPrice[1];
            
            
            state.filteredData = state.dataList.filter(
                 (item) => item.price >= minPrice && item.price <= maxPrice
             );
             state.selectedCategory = "all"
             window.localStorage.setItem('selectedCategory', "all")
             state.product_type_list = state.product_type_list.map(item => ({...item, checked : false}))
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
          if (state.selectedCategory === "all"){
                state.filteredData = state.dataList
                
            }

            else{
                updatedList = updatedList.filter(
                    (item) => item.category === state.selectedCategory
                )       
                
            }
            // product type Filter
        },
        
        
        
    },
    extraReducers: {
        [getProductsDetails.pending]: (state) => {
            state.isLoading = true;
        },
        [getProductsDetails.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = action.error.message;
        },
        [getProductsDetails.fulfilled]: (state, { payload }) => {
            state.dataList = payload;
            state.isLoading = false;
           
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