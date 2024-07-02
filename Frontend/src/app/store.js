import { configureStore } from "@reduxjs/toolkit";
import { cropReducer } from "../features/crop/cropSlice";
import { diseaseReducer } from "../features/diseases/diseaseSlice";
import { pestReducer } from "../features/pests/pestSlice";
import { productReducer } from "../features/product/productSlice";
import { authReducer } from "../features/auth/authSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { userReducer } from "../features/user/userSlice";
import { orderReducer } from "../features/order/orderSlice";
import { weatherReducer } from "../features/weather/weatherSlice";








export const store = configureStore({
    reducer:{
        crop:cropReducer,
        disease:diseaseReducer,
        pest:pestReducer,
        product:productReducer,
        auth:authReducer,
        cart:cartReducer,
        user:userReducer,
        order:orderReducer,
        weather:weatherReducer

    }
})