import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrder } from "./orderApi";

const initialState = {
  orders: [],
  currentOrder: null,
  totalOrders:0,
  status: "idle",
};

export const createOrderAsync = createAsyncThunk(
  "cart/createOrder",
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "cart/fetchAllOrders",
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "cart/updateOrder",
  async (updatedOrder) => {
    const response = await updateOrder(updatedOrder);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload.data);
        state.currentOrder = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {

        state.orders = action.payload.data.data;
        state.totalOrders = action.payload.data.items;
        state.status = "idle";
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload.data._id
        );
        state.orders[index] = action.payload.data;
        state.status = "idle";
      })
    },
  });


export const { resetOrder } = orderSlice.actions;
export const selectAllOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectOrdersStatus = (state) => state.order.status;


export const orderReducer = orderSlice.reducer;
