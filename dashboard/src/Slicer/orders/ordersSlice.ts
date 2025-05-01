import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '@/types/schema';

interface OrdersState {
  items: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedOrder: Order | null;
  filters: {
    status: string | null;
    fromDate: string | null;
    toDate: string | null;
    search: string;
  };
}

const initialState: OrdersState = {
  items: [],
  status: 'idle',
  error: null,
  selectedOrder: null,
  filters: {
    status: null,
    fromDate: null,
    toDate: null,
    search: '',
  },
};

// Mock API call - replace with actual API in production
const fetchOrdersAPI = (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          userId: '1',
          addressId: '1',
          status: 'Delivered',
          paymentId: '1',
          shippingId: '1',
          createdAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '2',
          userId: '2',
          addressId: '2',
          status: 'Shipped',
          paymentId: '2',
          shippingId: '2',
          createdAt: '2025-01-18T14:20:00Z',
        },
        {
          id: '3',
          userId: '3',
          addressId: '3',
          status: 'Pending',
          paymentId: '3',
          shippingId: '3',
          createdAt: '2025-01-20T09:15:00Z',
        },
        {
          id: '4',
          userId: '1',
          addressId: '1',
          status: 'Cancelled',
          paymentId: '4',
          shippingId: '4',
          createdAt: '2025-01-10T16:45:00Z',
        },
        {
          id: '5',
          userId: '4',
          addressId: '4',
          status: 'Delivered',
          paymentId: '5',
          shippingId: '5',
          createdAt: '2025-01-05T11:20:00Z',
        },
      ]);
    }, 500);
  });
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetchOrdersAPI();
  return response;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<OrdersState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const orderIndex = state.items.findIndex((order) => order.id === action.payload.id);
      if (orderIndex !== -1) {
        state.items[orderIndex].status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch orders';
      });
  },
});

export const { setSelectedOrder, updateFilters, clearFilters, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;