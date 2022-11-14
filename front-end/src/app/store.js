import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice"
import cartReducer from "../features/shopping_cart/cartSlice";
import orderReducer from "../features/Orders/orderSlice"
import authReducer from "../features/auth/authSlice"
import categoryReducer from "../features/categories/categorySlice"
import productDetails_reducer from "../features/productDetails/productDetails_slice";
import customers_Reducer from "../features/customers/customers_slice"

export const store = configureStore({
    reducer:{
        products : productsReducer,
        cart: cartReducer,
        orders : orderReducer,
        auth : authReducer,
        filteredProduct : categoryReducer,
        productDetails : productDetails_reducer,
        customers : customers_Reducer

    }
})