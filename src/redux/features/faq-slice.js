import { API_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFaqs = createAsyncThunk("faqs/fetchFaqs", async () => {
  const res = await fetch(API_URL + "/faqs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cache: "force-cache",
    },
  });
  const { data } = await res.json();
  const { faqs } = data;
  return faqs;
});

const initialState = {
  value: {
    faqs: [],
    isLoading: true,
  },
};
const faqsSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFaqs.fulfilled, (state, action) => {
      return (state = {
        value: {
          faqs: action.payload,
          isLoading: false,
        },
      });
    });
  },
});

export const {} = faqsSlice.actions;

export default faqsSlice.reducer;
