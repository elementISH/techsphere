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
        "Cache-Control": " no-cache, no-store, must-revalidate",
        cache: "force-cache",
      },
    });
    const { data } = await res.json();
    return { items: data, ids: data?.map((item) => item.id) };
  }
);

const initialState = {
  value: {
    items: [],
    favoriteIds: [],
    isLoading: true,
  },
};
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    resetFavorites: (state) => initialState,
    updateFavorites: (state, action) => {
      const { items, favoriteIds } = action.payload;
      state.value.items = items;
      state.value.favoriteIds = favoriteIds;
      state.value.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.value.items = action.payload.items;
      state.value.favoriteIds = action.payload.ids;
      state.value.isLoading = false;
    });
  },
});

export const { updateFavorites, resetFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
