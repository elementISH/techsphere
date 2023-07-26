import { API_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSlider = createAsyncThunk("slider/fetchSlider", async () => {
  const res = await fetch(API_URL + "/sliders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cache: "force-cache",
    },
  });
  const { data } = await res.json();
  const { sliders } = data;
  return sliders;
});

const initialState = {
  value: {
    images: [],
    isLoading: true,
  },
};
const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSlider.fulfilled, (state, action) => {
      state.value.images = action.payload;
      state.value.isLoading = false;
    });
  },
});

export const {} = sliderSlice.actions;

export default sliderSlice.reducer;
