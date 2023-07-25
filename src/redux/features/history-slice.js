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
        cache: "force-cache",
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
    resetHistory: (state, action) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      return (state = {
        value: {
          orders: action.payload,
          isLoading: false,
        },
      });
    });
  },
});

export const { resetHistory } = historySlice.actions;

export default historySlice.reducer;
