import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import admin from "./admin/adminSlice";
import meal from "./meal/mealSlice";
import rating from "./ratings/ratingSlice"

const store = configureStore({
  reducer: { auth, admin, meal, rating},
});

export default store;
