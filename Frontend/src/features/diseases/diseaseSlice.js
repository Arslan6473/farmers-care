import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllDiseases, fetchSelectedDiseases, fetchSingleDisease } from "./diseaseApi";

const initialState = {
  diseases: [],
  status: "idle",
  selectedDisease:null,
  items:null
};

export const fetchSingleDiseaseAsync = createAsyncThunk(
  "disease/fetchSingleDisease",
  async (diseaseId) => {
    const response = await fetchSingleDisease(diseaseId);
    return response.data;
  }
);

export const fetchAllDiseasesAsync = createAsyncThunk(
  "disease/fetchAllDiseases",
  async (pagination) => {
    const response = await fetchAllDiseases(pagination);
    return response.data;
  }
);

export const fetchSelectedDiseasesAsync = createAsyncThunk(
  "disease/fetchSelectedDiseases",
  async (cropName) => {
    const response = await fetchSelectedDiseases(cropName);
    return response.data;
  }
);


const diseaseSlice = createSlice({
  name: "disease",
  initialState,
  
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchAllDiseasesAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllDiseasesAsync.fulfilled, (state, action) => {
        state.diseases = action.payload.data.diseases;
        state.items = action.payload.data.items;
        state.status = "idle";
      })
      .addCase(fetchSingleDiseaseAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSingleDiseaseAsync.fulfilled, (state, action) => {
        state.selectedDisease = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchSelectedDiseasesAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSelectedDiseasesAsync.fulfilled, (state, action) => {
        state.diseases = action.payload.data;
        state.status = "idle";
      })
  },
});

export const selectAllDiseases = (state) => state.disease.diseases;
export const selectDiseasesStatus = (state) => state.disease.status;
export const selectSingleDisease = (state) => state.disease.selectedDisease;
export const selectTotalDisease = (state) => state.disease.items;




export const diseaseReducer = diseaseSlice.reducer;
