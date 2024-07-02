import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeatherData, iconUrl } from "./weatherApi";

const initialState = {
  weatherData: null,
  status: "idle",
};

export const fetchWeatherDataAsync = createAsyncThunk(
  "weather/fetchWeatherDataAsync",
  async (city) => {
    const data = await fetchWeatherData(city);
    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = data;

    const { description, icon } = weather[0];

    return {
      description,
      iconURL: iconUrl(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      country,
      name,
      speed,
    };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherDataAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchWeatherDataAsync.fulfilled, (state, action) => {
        state.weatherData = action.payload;
        state.status = "idle";
      })
      .addCase(fetchWeatherDataAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const selectWeatherData = (state) => state.weather.weatherData;
export const weatherStatus = (state) => state.weather.status;

export const weatherReducer = weatherSlice.reducer;
