
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BrandFilterState {
  selectedBrands: string[];
}

const initialState: BrandFilterState = {
  selectedBrands: [],
};

const brandFilterSlice = createSlice({
  name: 'brandFilter',
  initialState,
  reducers: {
    toggleBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload;
      const index = state.selectedBrands.indexOf(brand);
      if (index === -1) {
        state.selectedBrands.push(brand);
      } else {
        state.selectedBrands.splice(index, 1);
      }
    },
    resetBrands: (state) => {
      state.selectedBrands = [];
    },
  },
});

export const { toggleBrand, resetBrands } = brandFilterSlice.actions;
export default brandFilterSlice.reducer;
