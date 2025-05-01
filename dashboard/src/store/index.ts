import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '@/Slicer/products/productsSlice';
import ordersReducer from '@/Slicer/orders/ordersSlice';
import customersReducer from '@/Slicer/customers/customersSlice';
import paymentsReducer from '@/Slicer/payments/paymentsSlice';
import authReducer from '@/Slicer/auth/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    customers: customersReducer,
    payments: paymentsReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;