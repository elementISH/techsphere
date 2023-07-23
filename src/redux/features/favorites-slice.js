import { API_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (token) => {
    const res = await fetch(API_URL + "/wishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        cache: "force-cache",
      },
    });
    const { data } = await res.json();
    return { items: data, ids: data?.map((item) => item.id) };
  }
);

const initialState = {
  value: {
    items: null,
    favoriteIds: [],
    isLoading: true,
  },
};
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    resetFavorites: (state, action) => {
      return (state = initialState);
    },
    updateFavorites: (state, action) => {
      const { items, favoriteIds } = action.payload;
      return (state = {
        value: {
          items,
          favoriteIds,
          isLoading: false,
        },
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      return (state = {
        value: {
          items: action.payload.items,
          favoriteIds: action.payload.ids,
          isLoading: false,
        },
      });
    });
  },
});

export const { updateFavorites, resetFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
