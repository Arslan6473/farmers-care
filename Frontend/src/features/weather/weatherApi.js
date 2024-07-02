import axios from "axios";

const API_KEY = "7e3c55b2182c7bed4e070850c5230efe";

const iconUrl = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const fetchWeatherData = async (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(URL);
  return response.data;
};

export { fetchWeatherData, iconUrl };
