/** @format */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@/types/schema";

interface ProductsState {
     items: Product[];
     selectedProduct: Product | null;
     status: "idle" | "loading" | "succeeded" | "failed";
     error: string | null;
     filters: {
          category: string | null;
          minPrice: number | null;
          maxPrice: number | null;
          search: string;
     };
}

const initialState: ProductsState = {
     items: [],
     selectedProduct: null,
     status: "idle",
     error: null,
     filters: {
          category: null,
          minPrice: null,
          maxPrice: null,
          search: "",
     },
};

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

// Fetch all products
export const fetchProducts = createAsyncThunk<Product[]>(
     "products/fetchProducts",
     async () => {
          const res = await axios.get(API_URL);
          return res.data;
     },
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk<Product, string>(
     "products/fetchProductById",
     async (id) => {
          const res = await axios.get(`${API_URL}/${id}`);
          return res.data;
     },
);

// Create new product
export const createProduct = createAsyncThunk<Product, FormData>(
     "products/createProduct",
     async (productData) => {
          const res = await axios.post(`${API_URL}/save`, productData, {
               headers: {
                    "Content-Type": "multipart/form-data",
               },
          });
          return res.data.product;
     },
);

// Update product
export const updateProduct = createAsyncThunk<
     Product,
     { id: string; productData: FormData }
>("products/updateProduct", async ({ id, productData }) => {
     const res = await axios.post(`${API_URL}/update/${id}`, productData, {
          headers: {
               "Content-Type": "multipart/form-data",
          },
     });
     return res.data.product;
});

// Delete product
export const deleteProduct = createAsyncThunk<string, string>(
     "products/deleteProduct",
     async (id) => {
          await axios.delete(`${API_URL}/delete/${id}`);
          return id;
     },
);

const productsSlice = createSlice({
     name: "products",
     initialState,
     reducers: {
          setSelectedProduct: (
               state,
               action: PayloadAction<Product | null>,
          ) => {
               state.selectedProduct = action.payload;
          },
          updateFilters: (
               state,
               action: PayloadAction<Partial<ProductsState["filters"]>>,
          ) => {
               state.filters = { ...state.filters, ...action.payload };
          },
          clearFilters: (state) => {
               state.filters = initialState.filters;
          },
     },
     extraReducers: (builder) => {
          // Fetch all
          builder.addCase(fetchProducts.pending, (state) => {
               state.status = "loading";
               state.error = null;
          });
          builder.addCase(fetchProducts.fulfilled, (state, action) => {
               state.status = "succeeded";
               state.items = action.payload;
          });
          builder.addCase(fetchProducts.rejected, (state, action) => {
               state.status = "failed";
               state.error = action.error.message || "Failed to fetch products";
          });

          // Fetch by ID
          builder.addCase(fetchProductById.pending, (state) => {
               state.status = "loading";
          });
          builder.addCase(fetchProductById.fulfilled, (state, action) => {
               state.status = "succeeded";
               state.selectedProduct = action.payload;
          });
          builder.addCase(fetchProductById.rejected, (state, action) => {
               state.status = "failed";
               state.error =
                    action.error.message || "Failed to fetch product by ID";
          });

          // Create
          builder.addCase(createProduct.pending, (state) => {
               state.status = "loading";
          });
          builder.addCase(createProduct.fulfilled, (state, action) => {
               state.status = "succeeded";
               state.items.push(action.payload);
          });
          builder.addCase(createProduct.rejected, (state, action) => {
               state.status = "failed";
               state.error = action.error.message || "Failed to create product";
          });

          // Update
          builder.addCase(updateProduct.pending, (state) => {
               state.status = "loading";
          });
          builder.addCase(updateProduct.fulfilled, (state, action) => {
               state.status = "succeeded";
               state.items = state.items.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
               );
          });
          builder.addCase(updateProduct.rejected, (state, action) => {
               state.status = "failed";
               state.error = action.error.message || "Failed to update product";
          });

          // Delete
          builder.addCase(deleteProduct.pending, (state) => {
               state.status = "loading";
          });
          builder.addCase(deleteProduct.fulfilled, (state, action) => {
               state.status = "succeeded";
               state.items = state.items.filter(
                    (item) => item.id !== action.payload,
               );
          });
          builder.addCase(deleteProduct.rejected, (state, action) => {
               state.status = "failed";
               state.error = action.error.message || "Failed to delete product";
          });
     },
});

export const { setSelectedProduct, updateFilters, clearFilters } =
     productsSlice.actions;
export default productsSlice.reducer;
