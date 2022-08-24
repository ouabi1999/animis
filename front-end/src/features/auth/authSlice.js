import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("auth/getUser", () => {
  return fetch("/user")
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
        
      },
      logout(state) {
        state.user = null
        window.localStorage.setItem('isAuthenticated', false)
        window.location.href = "/"
      },
    },
    extraReducers: {
      [getUser.pending]: (state) => {
      state.loading = true;
      },
      [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.hasErrors = action.error.message;
      },
      [getUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      window.localStorage.setItem('isAuthenticated', true)
      console.log(payload)
  
      },
      },
  });
  
  export const {login, logout} = authSlice.actions;
  export default authSlice.reducer;