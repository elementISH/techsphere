import { API_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(API_URL + "/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cache: "force-cache",
      },
    });
    const { data } = await res.json();
    const { products } = data;
    return products;
  }
);

const initialState = {
  value: {
    products: [],
    isLoading: true,
  },
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.value.products = action.payload;
      state.value.isLoading = false;
    });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
