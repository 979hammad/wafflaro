import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice";
import productReducers from "../features/product/productSlice";

export const store = configureStore({
     reducer : {
          user : authReducers,
          product : productReducers
     }
});

export default store;