import { API_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (token) => {
    const res = await fetch(API_URL + "/order-history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Cache-Control": " no-cache, no-store, must-revalidate",
        cache: "no-store",
      },
    });
    const { data } = await res.json();
    if (data.length == 0) return [];
    const { orders } = data;
    return orders;
  }
);
const initialState = {
  value: {
    orders: [],
    isLoading: true,
  },
};
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    resetHistory: (state) => initialState,
    updateHistory: (state, action) => {
      state.value.orders = action.payload;
      state.value.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.value.orders = action.payload;
      state.value.isLoading = false;
    });
  },
});

export const { resetHistory, updateHistory } = historySlice.actions;

export default historySlice.reducer;
