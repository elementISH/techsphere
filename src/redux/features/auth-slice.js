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
      return (state = {
        value: {
          user: state.value.user,
          isVerified: action.payload,
          token: state.value.token,
          isAuth: true,
        },
      });
    },
    logOut: (state, action) => {
      return (state = initialState);
    },
    logIn: (state, action) => {
      return (state = {
        value: {
          user: {
            id: action.payload.user.id,
            name: action.payload.user.name,
            email: action.payload.user.email,
            phone: action.payload.user.phone,
            address: action.payload.user.address,
            city: action.payload.user.city,
            image: action.payload.user.image,
          },
          isVerified: action.payload.user.email_verified,
          token: action.payload.token,
          isAuth: true,
        },
      });
    },
    updateProfile: (state, action) => {
      return (state = {
        value: {
          user: {
            id: action.payload.id,
            name: action.payload.name,
            email: action.payload.email,
            phone: action.payload.phone,
            address: action.payload.address,
            city: action.payload.city,
            image: action.payload.image,
          },
          isVerified: action.payload.email_verified,
          token: state.value.token,
          isAuth: true,
        },
      });
    },
  },
});

export const { logIn, logOut, updateProfile, updateProfileVerify } =
  auth.actions;
export default auth.reducer;
