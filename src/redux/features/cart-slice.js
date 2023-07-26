import { API_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (token) => {
  const res = await fetch(API_URL + "/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      cache: "force-cache",
    },
  });
  const { data } = await res.json();
  return data;
});
const initialState = {
  value: {
    cart: [],
    isLoading: true,
  },
};
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    resetCart: (state) => initialState,
    updateCart: (state, action) => {
      state.value.cart = action.payload;
      state.value.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.value.cart = action.payload;
      state.value.isLoading = false;
    });
  },
});

export const { resetCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
