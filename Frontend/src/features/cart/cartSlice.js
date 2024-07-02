import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItem,
  fetchAllCartItems,
  resetCart,
  updateCart,
} from "./cartAPI";

const initialState = {
  cartItems: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (updatedItem) => {
    const response = await updateCart(updatedItem);
    return response.data;
  }
);

export const fetchAllCartItemsAsync = createAsyncThunk(
  "cart/fetchAllCartItems",
  async (userId) => {
    const response = await fetchAllCartItems(userId);
    return response.data;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (itemid) => {
    const response = await deleteCartItem(itemid);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  "cart/ resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const cartItem = action.payload.data[0];
        state.cartItems.push(cartItem);
        state.status = "idle";
      })
      .addCase(fetchAllCartItemsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllCartItemsAsync.fulfilled, (state, action) => {
        state.cartItems = action.payload.data;
        state.status = "idle";
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        const updatedItem = action.payload.data[0];
        const index = state.cartItems.findIndex(
          (item) => item._id === updatedItem._id
        );

        state.cartItems[index] = updatedItem;
        state.status = "idle";
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(
          (item) => item._id === action.payload.data._id
        );
        state.cartItems.splice(index, 1);
        state.status = "idle";
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.cartItems = [];
        state.status = "idle";
      });
  },
});

export const {} = cartSlice.actions;
export const selectAllCartItems = (state) => state.cart.cartItems;
export const selectCartStatus = (state) => state.cart.status;

export const cartReducer = cartSlice.reducer;
