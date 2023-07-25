import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth-slice";
import productsReducer from "@/features/products-slice";
import sliderReducer from "@/features/slider-slice";
import tokenReducer from "@/features/token-slice";
import filterReducer from "@/features/filter-slice";
import favoritesReducer from "@/features/favorites-slice";
import cartReducer from "@/features/cart-slice";
import historyReducer from "@/features/history-slice";
import faqsReducer from "@/features/faq-slice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["history", "favorites", "cart"],
};

const reducer = combineReducers({
  authReducer,
  productsReducer,
  sliderReducer,
  tokenReducer,
  filterReducer,
  favoritesReducer,
  cartReducer,
  historyReducer,
  faqsReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
