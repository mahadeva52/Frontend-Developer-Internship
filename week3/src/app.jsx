
import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getWeather() {
    if (!city.trim()) {
      setError("Please enter a city name!");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Get city coordinates
      const cityResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );

      const cityData = await cityResponse.json();

      if (!cityData.results || cityData.results.length === 0) {
        throw new Error("City not found!");
      }

      const place = cityData.results[0];

      // Get weather details
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
      );

      const data = await response.json();

      setWeather({
        name: place.name,
        country: place.country,
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        feelsLike: data.current.apparent_temperature,
        wind: data.current.wind_speed_10m,
        code: data.current.weather_code
      });

    } catch (err) {
      setError(err.message || "Something went wrong!");
    }

    setLoading(false);
  }

  function getCondition(code) {
    if (code === 0) return "Clear Sky ☀️";
    if ([1, 2, 3].includes(code)) return "Partly Cloudy ⛅";
    if ([45, 48].includes(code)) return "Foggy 🌫️";
    if ([51, 53, 55, 61, 63, 65].includes(code))
      return "Rainy 🌧️";
    if ([71, 73, 75, 77].includes(code))
      return "Snowy ❄️";
    if ([95, 96, 99].includes(code))
      return "Thunderstorm ⛈️";
    return "Weather Information";
  }

  return (
    <div className="app">
      <div className="weather-card">

        <h1>Weather App 🌤️</h1>
        <p className="subtitle">Check your city's weather</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") getWeather();
            }}
          />

          <button onClick={getWeather}>
            Search
          </button>
        </div>

        {loading && <p>Loading weather...</p>}

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="result">

            <h2>{weather.name}, {weather.country}</h2>

            <h1 className="temperature">
              {weather.temperature}°C
            </h1>

            <h3>{getCondition(weather.code)}</h3>

            <div className="details">
              <div>
                <h3>💧 {weather.humidity}%</h3>
                <p>Humidity</p>
              </div>

              <div>
                <h3>🌬️ {weather.wind} km/h</h3>
                <p>Wind Speed</p>
              </div>

              <div>
                <h3>{weather.feelsLike}°C</h3>
                <p>Feels Like</p>
              </div>
            </div>

          </div>
        )}

        <p className="footer">
          Created by Mahadeva | Week 3 Internship
        </p>

      </div>
    </div>
  );
}

export default App;
