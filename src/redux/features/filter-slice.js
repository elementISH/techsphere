import { API_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
async function fetchData(endpoint) {
  const res = await fetch(API_URL + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cache: "force-cache",
    },
  });
  const { data } = await res.json();
  return data;
}

export const fetchFilterDetails = createAsyncThunk(
  "filter/fetchFilterDetails",
  async () => {
    const { categories } = await fetchData(`/categories`);
    const { brands } = await fetchData(`/brands`);
    return {
      categories,
      brands,
    };
  }
);
export const fetchFilter = createAsyncThunk(
  "filter/fetchFilter",
  async (params) => {
    const { products } = await fetchData(`/products-filter?${params}`);
    return products;
  }
);

const initialState = {
  value: {
    products: [],
    categories: [],
    brands: [],
    isLoading: true,
  },
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.value.products = action.payload;
      state.value.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilter.fulfilled, (state, action) => {
      state.value.products = action.payload;
      state.value.isLoading = false;
    });
    builder.addCase(fetchFilterDetails.fulfilled, (state, action) => {
      state.value.categories = action.payload.categories;
      state.value.brands = action.payload.brands;
    });
  },
});

export const { updateFilter } = filterSlice.actions;

export default filterSlice.reducer;
