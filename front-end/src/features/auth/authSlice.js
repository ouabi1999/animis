import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("auth/getUser", () => {
  return fetch("/auth")
  .then((response) => {
  if (!response.ok){

    throw Error(response.statusText);
  }
   return response.json();
  })
  .then((data) => data);
  });

const initialAuthState = {
  isAuthenticated: false,
  user : null,
  loading : false,
  hasErrors: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
      login(state, action){
        state.user = action.payload
        window.localStorage.setItem('isAuthenticated', true)
        
      },
      register(state, action){
        state.user = action.payload
        window.localStorage.setItem('isAuthenticated', true)
        
      },

      logout(state, action) {
        state.user = null
        window.localStorage.setItem('isAuthenticated', false)
      },
    },
    extraReducers: {
      [getUser.pending]: (state) => {
          state.loading = true;
      },

      [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.hasErrors = action.error.message;
      window.localStorage.setItem('isAuthenticated', false)
      },
      
      [getUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      console.log( payload)
      state.loading = false;
      window.localStorage.setItem('isAuthenticated', true)
  
      },
      },
  });
  
  export const {login, logout, register} = authSlice.actions;
  export default authSlice.reducer;