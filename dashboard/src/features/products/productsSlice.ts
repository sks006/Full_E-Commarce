import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/types/schema';

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

// Mock API call - replace with actual API in production
const fetchProductsAPI = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          sellerId: '1',
          categoryId: '1',
          name: 'iPhone 15 Pro',
          description: 'Latest Apple iPhone with advanced features',
          price: 999,
          stock: 50,
          brand: 'Apple',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          sellerId: '1',
          categoryId: '1',
          name: 'Samsung Galaxy S24',
          description: 'Flagship Android phone with top specifications',
          price: 899,
          stock: 75,
          brand: 'Samsung',
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          sellerId: '2',
          categoryId: '2',
          name: 'MacBook Pro 16"',
          description: 'Powerful laptop for professionals',
          price: 2499,
          stock: 25,
          brand: 'Apple',
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          sellerId: '2',
          categoryId: '3',
          name: 'Sony WH-1000XM5',
          description: 'Premium noise-cancelling headphones',
          price: 349,
          stock: 100,
          brand: 'Sony',
          createdAt: new Date().toISOString(),
        },
        {
          id: '5',
          sellerId: '3',
          categoryId: '4',
          name: 'Nike Air Max 270',
          description: 'Comfortable athletic shoes',
          price: 150,
          stock: 200,
          brand: 'Nike',
          createdAt: new Date().toISOString(),
        },
      ]);
    }, 500);
  });
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetchProductsAPI();
  return response;
});

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
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setSelectedProduct, updateFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;