import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllPests, fetchSelectedPests, fetchSinglePest } from "./pestApi";

const initialState = {
  pests: [],
  status: "idle",
  selectedPest:null,
  items:null
};

export const fetchSinglePestAsync = createAsyncThunk(
  "pest/fetchSinglePest",
  async (cropId) => {
    const response = await fetchSinglePest(cropId);
    return response.data;
  }
);

export const fetchAllPestsAsync = createAsyncThunk(
  "pest/fetchAllPests",
  async (pagination) => {
    const response = await fetchAllPests(pagination);
    return response.data;
  }
);

export const fetchSelectedPestsAsync = createAsyncThunk(
  "pest/fetchSelectedPests",
  async (cropName) => {
    const response = await fetchSelectedPests(cropName);
    return response.data;
  }
);


const pestSlice = createSlice({
  name: "pest",
  initialState,
  
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchAllPestsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllPestsAsync.fulfilled, (state, action) => {
        state.pests = action.payload.data.pests;
        state.items = action.payload.data.items;

        state.status = "idle";
      })
      .addCase(fetchSinglePestAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSinglePestAsync.fulfilled, (state, action) => {
        state.selectedPest= action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchSelectedPestsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSelectedPestsAsync.fulfilled, (state, action) => {
        state.pests = action.payload.data;
        state.status = "idle";
      })
  },
});

export const selectAllPests = (state) => state.pest.pests;
export const selectPestsStatus = (state) => state.pest.status;
export const selectSinglePest = (state) => state.pest.selectedPest;
export const selectTotalPests = (state) => state.pest.items;


export const pestReducer = pestSlice.reducer;
