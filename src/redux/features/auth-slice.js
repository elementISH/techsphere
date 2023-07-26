import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    user: {
      id: null,
      name: null,
      email: null,
      phone: null,
      address: null,
      city: null,
      image: null,
    },
    isVerified: false,
    token: null,
    isAuth: false,
  },
};
export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfileVerify: (state, action) => {
      state.value.isVerified = action.payload;
    },
    logOut: (state, action) => initialState,
    updateProfile: (state, action) => {
      state.value.user.id = action.payload.user.id;
      state.value.user.name = action.payload.user.name;
      state.value.user.email = action.payload.user.email;
      state.value.user.phone = action.payload.user.phone;
      state.value.user.address = action.payload.user.address;
      state.value.user.city = action.payload.user.city;
      state.value.user.email = action.payload.user.email;
      state.value.user.image = action.payload.user.image;
      state.value.isVerified = action.payload.user.email_verified;
      state.value.token = action.payload.token;
      state.value.isAuth = true;
    },
  },
});

export const { logOut, updateProfile, updateProfileVerify } = auth.actions;
export default auth.reducer;
