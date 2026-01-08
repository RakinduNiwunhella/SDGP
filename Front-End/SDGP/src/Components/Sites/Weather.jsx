import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [past, setPast] = useState(null);
  const [cityDetails, setCityDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '1529d4eae1528788bc554b7728cc07b1'; 
  const CITY = 'Colombo';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch Today & Future
        const owUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`;
        const owResponse = await fetch(owUrl);
        if (!owResponse.ok) throw new Error("City not found or API limit reached");
        const owData = await owResponse.json();

        // 2. Fetch Past using Open-Meteo
        const { lat, lon } = owData.city.coord;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dateStr = yesterday.toISOString().split('T')[0];

        const omUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${dateStr}&end_date=${dateStr}&daily=temperature_2m_max&timezone=auto`;
        const omResponse = await fetch(omUrl);
        const omData = await omResponse.json();

        // Update States
        setCityDetails(owData.city);
        setCurrent(owData.list[0]);
        setForecast(owData.list.filter((_, index) => index % 8 === 0));
        setPast(omData.daily);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [API_KEY]);

  // Loading State
  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  );

  // Error State
  if (error) return (
    <div className="flex h-screen items-center justify-center bg-slate-900 text-red-400">
      <p>Error: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">{cityDetails?.name}, {cityDetails?.country}</h1>
          <p className="text-slate-400">Weather Insights: Past, Today & Future</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* PAST CARD - Added Optional Chaining past?.temperature_2m_max?.[0] */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Yesterday</h3>
            <div className="mt-4">
              <p className="text-3xl font-bold">
                {past?.temperature_2m_max?.[0] ? `${Math.round(past.temperature_2m_max[0])}°C` : 'N/A'}
              </p>
              <p className="text-slate-500 text-sm mt-1">Historical High</p>
            </div>
          </div>

          {/* CURRENT CARD */}
          <div className="bg-blue-600 p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <h3 className="text-sm font-medium text-blue-100 uppercase tracking-wider">Today</h3>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-5xl font-bold text-white">
                  {current?.main?.temp ? `${Math.round(current.main.temp)}°C` : '--'}
                </p>
                <p className="capitalize text-blue-100 mt-2">{current?.weather[0]?.description}</p>
              </div>
              {current?.weather[0]?.icon && (
                <img 
                  src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} 
                  alt="weather icon" 
                  className="w-20 h-20"
                />
              )}
            </div>
          </div>

          {/* DETAILS CARD */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Details</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Humidity</span>
                <span className="font-semibold">{current?.main?.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Wind</span>
                <span className="font-semibold">{current?.wind?.speed} m/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* FUTURE FORECAST */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-white">5-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {forecast.map((day, i) => (
              <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                <p className="text-sm text-slate-400">
                  {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <img 
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                  alt="icon" 
                  className="mx-auto my-2"
                />
                <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Weather;