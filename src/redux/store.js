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

export const store = configureStore({
  reducer: {
    authReducer,
    productsReducer,
    sliderReducer,
    tokenReducer,
    filterReducer,
    favoritesReducer,
    cartReducer,
    historyReducer,
    faqsReducer,
  },
});
