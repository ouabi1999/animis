import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice"
import cartReducer from "../features/shopping_cart/cartSlice";
import orderReducer from "../features/Orders/orderSlice"
import authReducer from "../features/auth/authSlice"
import categoryReducer from "../features/categories/categorySlice"

export const store = configureStore({
    reducer:{
        products : productsReducer,
        cartItems: cartReducer,
        orders : orderReducer,
        auth : authReducer,
        filteredProduct : categoryReducer,
    }
})