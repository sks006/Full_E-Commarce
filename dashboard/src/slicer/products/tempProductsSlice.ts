import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Product } from '@/types/schema';

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedProduct: Product | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    search: string;
  };
  
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  selectedProduct: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    search: '',
  },
};



export const fetchProducts = createAsyncThunk(
  'products/fetchProduct',
  async () => {
    try {
      console.log("🚀 Thunk started: fetchProducts");
      const response = await axios.get(API_URL);
      console.log(response.data)
      return response.data; 

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return Promise.reject(axiosError.response ? axiosError.response.data : axiosError.message);
      }
      return Promise.reject('An unknown error occurred');
    }
  }
);

export const fetchProductById = createAsyncThunk('products/fetchProductsById',
  async(id:number) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response ? error.response.data : error.message);
        }
        return Promise.reject('An unknown error occurred');
      }
      return Promise.reject('An unknown error occurred');
    }
  }
)
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData) => {
    try {
      const response = await axios.post(`${API_URL}/save`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.brand; // Assuming response.data.brand contains the created brand
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response ? error.response.data : error.message);
        }
        return Promise.reject('An unknown error occurred');
      }
      return Promise.reject('An unknown error occurred');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updatedData }: { id: number; updatedData: Product }) => {
    try {
      const response = await axios.post(`${API_URL}/update/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response ? error.response.data : error.message);
        }
        return Promise.reject('An unknown error occurred');
      }
      return Promise.reject('An unknown error occurred');
    }
  }
);

// Delete a brand
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number, { rejectWithValue }) => {  // Explicit number type
    try {
      await axios.get(`${API_URL}/delete/${id}`);
      return id; // Returns number
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
 extraReducers: (builder) => {
  builder
    // Fetch all products
    .addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload.items;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to fetch products';
    })

    // Fetch product by ID
    .addCase(fetchProductById.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProductById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.selectedProduct = action.payload;
    })
    .addCase(fetchProductById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to fetch product by ID';
    })

    // Create a product
    .addCase(createProduct.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items.push(action.payload); // Add the new product to the list
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to create product';
    })

    // Update a product
    .addCase(updateProduct.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload; // Update the product in the list
      }
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to update product';
    })

   // Delete a product
.addCase(deleteProduct.pending, (state) => {
  state.status = 'loading';
})
.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
  state.status = 'succeeded';
  state.items = state.items.filter((item) => item.id !== action.payload);
})
.addCase(deleteProduct.rejected, (state, action) => {
  state.status = 'failed';
  state.error = action.error.message ?? 'Failed to delete product';
});

},
});

export const { setSelectedProduct, updateFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;