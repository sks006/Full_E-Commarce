import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/types/schema';

interface CustomersState {
  items: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedCustomer: User | null;
  filters: {
    search: string;
  };
}

const initialState: CustomersState = {
  items: [],
  status: 'idle',
  error: null,
  selectedCustomer: null,
  filters: {
    search: '',
  },
};

// Mock API call - replace with actual API in production
const fetchCustomersAPI = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          gender: 'Male',
          createdAt: '2024-10-01T08:30:00Z',
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+1987654321',
          gender: 'Female',
          createdAt: '2024-09-15T14:20:00Z',
        },
        {
          id: '3',
          name: 'Michael Johnson',
          email: 'michael.j@example.com',
          phone: '+1122334455',
          gender: 'Male',
          createdAt: '2024-11-05T11:15:00Z',
        },
        {
          id: '4',
          name: 'Emily Wilson',
          email: 'emily.w@example.com',
          phone: '+1555666777',
          gender: 'Female',
          createdAt: '2024-08-20T09:45:00Z',
        },
        {
          id: '5',
          name: 'David Brown',
          email: 'david.b@example.com',
          phone: '+1999888777',
          gender: 'Male',
          createdAt: '2024-12-10T16:30:00Z',
        },
      ]);
    }, 500);
  });
};

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const response = await fetchCustomersAPI();
  return response;
});

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<User | null>) => {
      state.selectedCustomer = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<CustomersState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customers';
      });
  },
});

export const { setSelectedCustomer, updateFilters, clearFilters } = customersSlice.actions;
export default customersSlice.reducer;