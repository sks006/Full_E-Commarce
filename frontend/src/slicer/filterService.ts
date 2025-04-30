
import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

// Define proper types for the base query
type AxiosBaseQueryFn = BaseQueryFn<{
  url: string;
  method: string;
  data?: Record<string, unknown>;
}, unknown, unknown>;

// Custom axios base query with proper typing
const axiosBaseQuery: AxiosBaseQueryFn = async ({ url, method, data }) => {
  try {
    const result = await axios({
      url: `/api${url}`,
      method,
      data
    });
    return { data: result.data };
  } catch (error) {
    return { error };
  }
};

// Define the shape of available brands from API
interface BrandsResponse {
  brands: string[];
}

// Define the shape of available price ranges from API
interface PriceRangeResponse {
  min: number;
  max: number;
}

export const filterApi = createApi({
  reducerPath: 'filterApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getAvailableBrands: builder.query<string[], void>({
      query: () => ({
        url: '/brands',
        method: 'get'
      }),
      transformResponse: (response: BrandsResponse) => response.brands,
    }),
    getAvailablePriceRange: builder.query<{ min: number; max: number }, void>({
      query: () => ({
        url: '/price-range',
        method: 'get'
      }),
      transformResponse: (response: PriceRangeResponse) => ({
        min: response.min,
        max: response.max
      }),
    }),
  }),
});

export const { useGetAvailableBrandsQuery, useGetAvailablePriceRangeQuery } = filterApi;

// Fallback data for when API is not available
export const FALLBACK_BRANDS = [
  "Nike", "Adidas", "Puma", "Reebok", "Under Armour"
];

export const FALLBACK_PRICE_RANGE = {
  min: 0,
  max: 1000
};
