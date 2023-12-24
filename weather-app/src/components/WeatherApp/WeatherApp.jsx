import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  const API_KEY = "0e428fc4a99ba90045b8e0e5de5f5472";

  const defaultWeatherData = {
    wicon: cloud_icon,
    humidity: "42",
    windSpeed: "42",
    temperature: "42",
    location: "Konya",
  };

  const [weatherData, setWeatherData] = useState(defaultWeatherData);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    try {
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`;
      let res = await fetch(URL);
      let data = await res.json();

      const selectedIcon = getWeatherIcon(data.weather[0].icon);

      setWeatherData({
        wicon: selectedIcon,
        humidity: data.main.humidity + "%",
        windSpeed: data.wind.speed + " km/h",
        temperature: data.main.temp + "°C",
        location: data.name,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getWeatherIcon = (weatherCode) => {
    console.log(weatherCode);
    if (weatherCode === "01d" || weatherCode === "01n") {
      return clear_icon;
    } else if (weatherCode === "02d" || weatherCode === "02n") {
      return cloud_icon;
    } else if (
      weatherCode === "03d" ||
      weatherCode === "03n" ||
      weatherCode === "04d" ||
      weatherCode === "04n"
    ) {
      return drizzle_icon;
    } else if (
      weatherCode === "09d" ||
      weatherCode === "09n" ||
      weatherCode === "10d" ||
      weatherCode === "10n"
    ) {
      return rain_icon;
    } else if (weatherCode === "13d" || weatherCode === "13n") {
      return snow_icon;
    } else {
      return clear_icon;
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon">
          <img src={search_icon} alt="search_icon" onClick={() => search()} />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherData.wicon} alt="weather_icon" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="humidity_icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="wind_icon" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      <p style={{ color: "orange" }}>
        Thanks for Everythings{" "}
        <strong style={{ fontSize: "1.3rem" }}>Arif!</strong>
      </p>
    </div>
  );
};

export default WeatherApp;
