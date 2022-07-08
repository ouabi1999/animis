import {createSlice} from "@reduxjs/toolkit"

export const orderSlice = createSlice({
    name:"orders",
   initialState:{
       orders: [],
       loading:false,
       orderComplet :false
       
   },
   reducers:{
       setOrders(state, action){
           state.orders = action.payload
           state.orderComplet = true
       }

   }
})
export const {setOrders} = orderSlice.actions
export default orderSlice.reducer