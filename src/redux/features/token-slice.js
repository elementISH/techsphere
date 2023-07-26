import { API_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchToken = createAsyncThunk("token/fetchToken", async () => {
  const res = await fetch(API_URL + "/token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cache: "force-cache",
    },
  });
  const { data } = await res.json();
  return data;
});

const initialState = {
  value: {
    token: null,
  },
};
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.value.token = action.payload.token;
    });
  },
});

export const {} = tokenSlice.actions;

export default tokenSlice.reducer;
