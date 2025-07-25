import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    allOrders: [],
    allMeals: [],
    allRatings: [],
    adminLoading: false,
    adminSuccess: false,
    adminError: false,
    adminErrorMessage: "",
    editMeal: {
      meal: {},
      isEdit: false,
    },
  },
  reducers: {
    mealEdit: (state, action) => {
      return {
        ...state,
        editMeal: {
          meal: action.payload,
          isEdit: true,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.users = action.payload;
        state.adminError = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(getAllOrders.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allOrders = action.payload;
        state.adminError = false;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(getAllRatings.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(getAllRatings.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allRatings = action.payload;
        state.adminError = false;
      })
      .addCase(getAllRatings.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(getAllMeals.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(getAllMeals.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allMeals = action.payload;
        state.adminError = false;
      })
      .addCase(getAllMeals.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(removeMeal.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(removeMeal.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allMeals = state.allMeals.filter(
          (meal) => meal._id !== action.payload._id
        );
        state.adminError = false;
      })
      .addCase(removeMeal.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(addMeal.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allMeals = [...state.allMeals, action.payload];
        state.adminError = false;
      })
      .addCase(addMeal.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(updateTheMeal.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(updateTheMeal.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allMeals = state.allMeals.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.editMeal = {
          meal: {},
          isEdit: false,
        };
        state.adminError = false;
      })
      .addCase(updateTheMeal.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(updateTheOrder.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(updateTheOrder.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allOrders = state.allOrders.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.adminError = false;
      })
      .addCase(updateTheOrder.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      });
  },
});

export const { mealEdit } = adminSlice.actions;
export default adminSlice.reducer;

//Getting All Users

export const getAllUsers = createAsyncThunk(
  "ADMIN/FETCH",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.fetchAllUsers(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Getting All Orders
export const getAllOrders = createAsyncThunk(
  "ADMIN/FETCH/ORDERS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.fetchAllOrders(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Getting All Ratings
export const getAllRatings = createAsyncThunk(
  "ADMIN/FETCH/RATINGS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.fetchAllRatings(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Getting All Meals
export const getAllMeals = createAsyncThunk(
  "ADMIN/FETCH/MEALS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.fetchAllMeals(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove Meal
export const removeMeal = createAsyncThunk(
  "ADMIN/REMOVE/MEAL",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.deleteMeal(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add Meal
export const addMeal = createAsyncThunk(
  "ADMIN/ADD/MEAL",
  async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.createMeal(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Meal
export const updateTheMeal = createAsyncThunk(
  "ADMIN/UPDATE/MEAL",
  async (updatedMeal, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.updateMeal(updatedMeal, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Order
export const updateTheOrder = createAsyncThunk(
  "ADMIN/UPDATE/ORDER",
  async (orderUpdate, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.updateOrder(orderUpdate, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
