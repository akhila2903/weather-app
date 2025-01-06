// src/Weather.js

import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch weather data
  const fetchWeather = async () => {
    const apiKey = "9102b60033c5aafe22a59784c60991fc"; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={handleChange}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
