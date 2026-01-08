import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Colombo Coordinates
  const LAT = 6.9271;
  const LON = 79.8612;

  useEffect(() => {
    const fetchAllWeather = async () => {
      try {
        setLoading(true);
        
        // Dates for History
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const dateStr = yesterday.toISOString().split('T')[0];

        // Combine Forecast and Historical in one call (or two concurrent ones)
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=1&timezone=auto`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data from Open-Meteo");
        const data = await response.json();

        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllWeather();
  }, []);

  // Map Open-Meteo codes to icons/descriptions
  const getWeatherInfo = (code) => {
    if (code === 0) return { desc: "Clear Sky", icon: "☀️" };
    if (code <= 3) return { desc: "Partly Cloudy", icon: "⛅" };
    if (code >= 45 && code <= 48) return { desc: "Foggy", icon: "🌫️" };
    if (code >= 51 && code <= 67) return { desc: "Rainy", icon: "🌧️" };
    return { desc: "Stormy", icon: "⛈️" };
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-400"></div>
    </div>
  );

  const currentInfo = getWeatherInfo(weather.current.weather_code);

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">Colombo, Sri Lanka</h1>
          <p className="text-slate-400">Powered by Open-Meteo (No API Key Required)</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* PAST (Yesterday) - Open-Meteo includes past_days automatically */}
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Yesterday</h3>
            <div className="mt-4">
              <p className="text-4xl font-bold">{Math.round(weather.daily.temperature_2m_max[0])}°C</p>
              <p className="text-slate-500 text-sm mt-1">Recorded High</p>
            </div>
          </div>

          {/* CURRENT */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
            <h3 className="text-xs font-bold text-blue-100 uppercase tracking-widest">Today</h3>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-5xl font-bold text-white">{Math.round(weather.current.temperature_2m)}°C</p>
                <p className="text-blue-100 mt-2 font-medium">{currentInfo.desc}</p>
              </div>
              <span className="text-6xl">{currentInfo.icon}</span>
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Metrics</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Humidity</span>
                <span className="font-semibold">{weather.current.relative_humidity_2m}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Wind Speed</span>
                <span className="font-semibold">{weather.current.wind_speed_10m} km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-DAY FORECAST */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-6">7-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {weather.daily.time.map((date, i) => {
              if (i === 0) return null; // Skip yesterday
              const dayInfo = getWeatherInfo(weather.daily.weather_code[i]);
              return (
                <div key={i} className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700 text-center">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <div className="text-2xl my-2">{dayInfo.icon}</div>
                  <p className="text-lg font-bold">{Math.round(weather.daily.temperature_2m_max[i])}°</p>
                  <p className="text-[10px] text-slate-500">{Math.round(weather.daily.temperature_2m_min[i])}°</p>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Weather;