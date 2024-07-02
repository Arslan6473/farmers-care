import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllCrops, fetchSingleCrop } from "./cropApi";
;

const initialState = {
  crops: [],
  status: "idle",
  selectedCrop:null
};

export const fetchSingleCropAsync = createAsyncThunk(
  "crop/fetchSingleCrop",
  async (cropId) => {
    const response = await fetchSingleCrop(cropId);
    return response.data;
  }
);

export const fetchAllCropsAsync = createAsyncThunk(
  "crop/fetchAllCrops",
  async () => {
    const response = await fetchAllCrops();
    return response.data;
  }
);


const cropSlice = createSlice({
  name: "crop",
  initialState,
  
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchAllCropsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllCropsAsync.fulfilled, (state, action) => {
        state.crops = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchSingleCropAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSingleCropAsync.fulfilled, (state, action) => {
        state.selectedCrop = action.payload.data;
        state.status = "idle";
      })
  },
});

export const selectAllCrops = (state) => state.crop.crops;
export const selectCropsStatus = (state) => state.crop.status;
export const selectSingleCrop = (state) => state.crop.selectedCrop;



export const cropReducer = cropSlice.reducer;
