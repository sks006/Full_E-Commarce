
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceRange {
  min: number;
  max: number;
}

const initialState: PriceRange = {
  min: 0,
  max: 1000
};

const priceRangeSlice = createSlice({
  name: 'priceRange',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.min = action.payload.min;
      state.max = action.payload.max;
    },
    resetPriceRange: () => initialState
  },
});

export const { setPriceRange, resetPriceRange } = priceRangeSlice.actions;
export default priceRangeSlice.reducer;
