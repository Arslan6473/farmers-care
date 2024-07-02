import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from "./userApi";

const initialState = {
  userOrders: [],
  loggedInUserInfo:null,
  status: "idle",
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);

export const updateLoggedInUserAsync = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
    const response = await updateUser(userData);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.userOrders = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.loggedInUserInfo = action.payload.data;
        state.status = "idle";
      })
      .addCase(updateLoggedInUserAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateLoggedInUserAsync.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.loggedInUserInfo = action.payload.data;
        state.status = "idle";
      })
     
  },
});

export const {} = userSlice.actions;
export const selecetLoggedInUserAllOrders = (state) => state.user.userOrders;
export const loggedInUserInfo = (state) => state.user.loggedInUserInfo;
export const loggedInUserOrdersStatus = (state) => state.user.status;


export const userReducer = userSlice.reducer;
