
import { configureStore } from '@reduxjs/toolkit';
import priceRangeReducer from '../slicer/priceRangeSlice';
import brandFilterReducer from '../slicer/brandFilterSlice';
import { filterApi } from '@/slicer/filterService';
import productSlicer from '@/slicer/productSlicer';

export const store = configureStore({
  reducer: {
    priceRange: priceRangeReducer,
    brandFilter: brandFilterReducer,
    products: productSlicer,

    [filterApi.reducerPath]: filterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
