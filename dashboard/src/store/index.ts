/** @format */

import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/slicer/products/productsSlice";
import ordersReducer from "@/slicer/orders/ordersSlice";
import customersReducer from "@/slicer/customers/customersSlice";
import paymentsReducer from "@/slicer/payments/paymentsSlice";
import authReducer from "@/auth/authSlice";

export const store = configureStore({
     reducer: {
          products: productsReducer,
          orders: ordersReducer,
          customers: customersReducer,
          payments: paymentsReducer,
          auth: authReducer,
     },
     devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
