import "./App.css";
import { useState, useEffect } from "react";
const API_KEY = "f29c68c4b8bd91757189f73db0dd9356";
function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);
  const [hum, setHum] = useState("");
  const [rain, setRain] = useState("");
  const [enteredCity, setEnteredCity] = useState("");

  const handleButtonClick = async () => {
    console.log("Entered city:", city);
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      const result = await fetch(URL);
      const json = await result.json();
      console.log(json.weather[0].main);
      if (json.main) {
        setTemp(json.main.temp);
        setHum(json.main.humidity);
        setRain(json.weather[0].main);
        setEnteredCity(city);
      } else {
        setTemp(null);
        setEnteredCity("");
        setHum(null);
        setRain(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setTemp(null);
      setEnteredCity("");
      setHum(null);
      setRain(null);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-400">
      <div className="bg-white p-8 text-center rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Weather App</h2>
        <div className="mb-4 text-left">
          <label
            htmlFor="location"
            className="block text-gray-700 font-bold mb-2"
          >
            Location
          </label>
          <input
            id="location"
            className="outline p-2 border rounded w-full"
            placeholder="Enter location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button
            className="bg-green-400 hover:bg-green-500 rounded-full p-2 font-bold transition-colors duration-300"
            onClick={handleButtonClick}
          >
            Get Weather
          </button>
        </div>
        <p className="mt-4 uppercase font-bold">{enteredCity} </p>
        <p className="mt-4 ">
          Temp now : <b>{temp}°C</b>
        </p>
        <p className="mt-2 ">
          Humidity now : <b>{hum} </b>
        </p>
        <p className="mt-2 ">
          Weather : <b>{rain}</b>{" "}
        </p>
      </div>
    </div>
  );
}

export default App;
