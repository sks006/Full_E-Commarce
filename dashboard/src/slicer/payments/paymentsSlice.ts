import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Payment } from '@/types/schema';

interface PaymentsState {
  items: Payment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedPayment: Payment | null;
  filters: {
    status: string | null;
    paymentMethod: string | null;
    fromDate: string | null;
    toDate: string | null;
    search: string;
  };
}

const initialState: PaymentsState = {
  items: [],
  status: 'idle',
  error: null,
  selectedPayment: null,
  filters: {
    status: null,
    paymentMethod: null,
    fromDate: null,
    toDate: null,
    search: '',
  },
};

// Mock API call - replace with actual API in production
const fetchPaymentsAPI = (): Promise<Payment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          userId: '1',
          orderId: '1',
          paymentMethod: 'Card',
          status: 'Paid',
          transactionId: 'TXN123456789',
          paidAt: '2025-01-15T11:30:00Z',
        },
        {
          id: '2',
          userId: '2',
          orderId: '2',
          paymentMethod: 'bKash',
          status: 'Paid',
          transactionId: 'BKH987654321',
          paidAt: '2025-01-18T15:20:00Z',
        },
        {
          id: '3',
          userId: '3',
          orderId: '3',
          paymentMethod: 'COD',
          status: 'Pending',
          transactionId: null,
          paidAt: null,
        },
        {
          id: '4',
          userId: '1',
          orderId: '4',
          paymentMethod: 'Card',
          status: 'Failed',
          transactionId: 'TXN111222333',
          paidAt: null,
        },
        {
          id: '5',
          userId: '4',
          orderId: '5',
          paymentMethod: 'Nagad',
          status: 'Paid',
          transactionId: 'NGD555666777',
          paidAt: '2025-01-05T12:30:00Z',
        },
      ]);
    }, 500);
  });
};

export const fetchPayments = createAsyncThunk('payments/fetchPayments', async () => {
  const response = await fetchPaymentsAPI();
  return response;
});

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setSelectedPayment: (state, action: PayloadAction<Payment | null>) => {
      state.selectedPayment = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<PaymentsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch payments';
      });
  },
});

export const { setSelectedPayment, updateFilters, clearFilters } = paymentsSlice.actions;
export default paymentsSlice.reducer;