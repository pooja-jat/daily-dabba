import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "./orderService";

const orderslice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    cart: null,
    ordersLoading: false,
    ordersSuccess: false,
    ordersError: false,
    ordersErrorMessage: "",
  },
  reducers: {
    addToCart: (state, action) => {
      return {
        ...state,
        cart: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.ordersLoading = true;
        state.ordersSuccess = false;
        state.ordersError = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.ordersSuccess = true;
        state.orders = action.payload;
        state.ordersError = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersSuccess = false;
        state.ordersError = true;
        state.ordersErrorMessage = action.payload;
      })
      .addCase(addOrder.pending, (state, action) => {
        state.ordersLoading = true;
        state.ordersSuccess = false;
        state.ordersError = false;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.ordersSuccess = true;
        state.orders = [action.payload, ...state.orders];
        state.cart = null;
        state.ordersError = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersSuccess = false;
        state.ordersError = true;
        state.ordersErrorMessage = action.payload;
      })
      .addCase(cancelOrder.pending, (state, action) => {
        state.ordersLoading = true;
        state.ordersSuccess = false;
        state.ordersError = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.ordersSuccess = true;
        state.orders = state.orders.map(
          (order) => order._id === action.payload._id
        )
          ? action.payload
          : order;
        state.cart = null;
        state.ordersError = false;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersSuccess = false;
        state.ordersError = true;
        state.ordersErrorMessage = action.payload;
      });
  },
});

export const { addToCart } = orderslice.actions;
export default orderslice.reducer;

//Get Orders
export const getOrders = createAsyncThunk(
  "ORDER/FETCH",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return orderService.fetchOrders(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Add Order

export const addOrder = createAsyncThunk("ORDER/ADD", async (id, thunkAPI) => {
  let token = thunkAPI.getState().auth.user.token;
  try {
    return await orderService.orderMeal(id, token);
  } catch (error) {
    console.log("err", error);
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

//Cancel Order
export const cancelOrder = createAsyncThunk(
  "ORDER/CANCEL",
  async (id, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return orderService.updateOrder(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
