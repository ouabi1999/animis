import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const getDisplayInfo = createAsyncThunk("displayInfo/getDisplayInfo", () => {
    return fetch("/displayInfo")
    .then((response) => {
    if (!response.ok){
  
      throw Error(response.statusText);
    }
     return response.json();
    })
    .then((data) => data);
    });

    export const getDisplayInfoSlice = createSlice({
        name:"display",
        initialState:{
            display: {
                id: null,
                logo: "",
                header: {

                    title: "",
                    banner: "",

                },
                main_category: [],
                category: [],
                banners: [],
                slider: [],
                pop_up: [],
                count_Down: false,
            },
            isLoaded : false,
            hasError : false
            
        },
        reducers:{
            setDisplayInfo(state, action){
                state.display = action.payload
               
            }
        },
        extraReducers: {
         [getDisplayInfo.pending]: (state) => {
         state.isLoaded = true;
         },
         [getDisplayInfo.rejected]: (state, action) => {
         state.isLoaded = false;
         state.hasError = action.error.message;
         },
         [getDisplayInfo.fulfilled]: (state, { payload }) => {
            if(payload !== null){
                state.display = payload;
            }
        
         console.log(state.display)
         state.isLoaded = false;
         
     
         },
         },
     
     })
     export const { setDisplayInfo } = getDisplayInfoSlice.actions
     export default getDisplayInfoSlice.reducer