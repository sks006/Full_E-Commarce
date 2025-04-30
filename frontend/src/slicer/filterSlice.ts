
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceRange {
  min: number;
  max: number;
}

interface FilterState {
  priceRange: PriceRange;
  selectedBrands: string[];
}

const initialState: FilterState = {
  priceRange: { min: 0, max: 1000 },
  selectedBrands: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.priceRange = action.payload;
    },
    toggleBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload;
      const index = state.selectedBrands.indexOf(brand);
      if (index === -1) {
        state.selectedBrands.push(brand);
      } else {
        state.selectedBrands.splice(index, 1);
      }
    },
    clearFilters: (state) => {
      state.priceRange = initialState.priceRange;
      state.selectedBrands = initialState.selectedBrands;
    },
  },
});

export const { setPriceRange, toggleBrand, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
