import React, { useState, useEffect, useCallback } from 'react';

const RiceVisionWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LAT = 6.9271; 
  const LON = 79.8612;

  const fetchAgroWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Using past_days=7 to get history and forecast in one synchronized object
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&past_days=7&timezone=auto`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Connection failed. Please refresh.");
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [LAT, LON]);

  useEffect(() => {
    fetchAgroWeather();
  }, [fetchAgroWeather]);

  const getCondition = (code) => {
    // Simplified icons and descriptions for non-technical users
    if (code === 0) return { desc: "Clear Sky", icon: "☀️", color: "text-amber-400" };
    if (code <= 3) return { desc: "Partly Cloudy", icon: "⛅", color: "text-emerald-300" };
    if (code >= 51 && code <= 67) return { desc: "Rainy", icon: "🌧️", color: "text-blue-400" };
    if (code >= 95) return { desc: "Stormy", icon: "⛈️", color: "text-red-400" };
    return { desc: "Cloudy", icon: "☁️", color: "text-slate-400" };
  };

  if (loading) return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#0f172a] gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
      <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Syncing Field Data...</p>
    </div>
  );

  if (error) return (
    <div className="flex h-screen items-center justify-center bg-[#0f172a] p-6 text-center">
      <button onClick={fetchAgroWeather} className="text-emerald-400 border border-emerald-500/30 px-6 py-2 rounded-full text-xs font-bold hover:bg-emerald-500/10">
        Sync Failed: {error}. Click to Retry.
      </button>
    </div>
  );

  const currentInfo = getCondition(weather.current.weather_code);

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 md:p-8 text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Colombo Station</h1>
            <p className="text-slate-500 text-sm mt-1 uppercase font-bold tracking-widest">RiceVision Weather Intelligence</p>
          </div>
          <div className="mt-4 md:mt-0 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
            <p className="text-[10px] text-slate-400 font-bold">CURRENT FIELD CONDITION</p>
            <p className="text-emerald-400 font-black">{currentInfo.desc}</p>
          </div>
        </header>

        {/* --- TODAY'S DETAILED METRICS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[250px]">
            <div className="z-10">
              <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">Right Now</span>
              <p className="text-8xl font-black text-white mt-2">{Math.round(weather.current.temperature_2m)}°C</p>
              <p className="bg-white/20 backdrop-blur-md inline-block px-5 py-2 rounded-full text-xs font-black uppercase mt-6 tracking-widest border border-white/10">
                {currentInfo.desc}
              </p>
            </div>
            <span className="absolute right-[-10px] bottom-[-30px] text-[16rem] opacity-20 pointer-events-none select-none">{currentInfo.icon}</span>
          </div>

          <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 flex flex-col justify-center gap-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Air Moisture</span>
                <span className="text-2xl font-black text-emerald-100">{weather.current.relative_humidity_2m}%</span>
              </div>
              <span className="text-2xl">💧</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cloud Density</span>
                <span className="text-2xl font-black text-emerald-100">{weather.current.cloud_cover}%</span>
              </div>
              <span className="text-2xl">☁️</span>
            </div>
          </div>

          <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 flex flex-col justify-center gap-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Wind Speed</span>
                <span className="text-2xl font-black text-emerald-100">{weather.current.wind_speed_10m} <small className="text-xs opacity-50">km/h</small></span>
              </div>
              <span className="text-2xl">💨</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Surface Rain</span>
                <span className="text-2xl font-black text-emerald-100">{weather.current.precipitation} <small className="text-xs opacity-50">mm</small></span>
              </div>
              <span className="text-2xl">🌧️</span>
            </div>
          </div>
        </div>

        {/* --- HISTORICAL & FORECAST DATA (IDENTICAL BOXES) --- */}
        <section className="space-y-12">
          
          {/* PAST 7 DAYS (History) */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Historical Field Log (Past 7 Days)</h3>
              <div className="h-px flex-1 bg-slate-800"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {weather.daily.time.slice(0, 7).map((date, i) => {
                const dayInfo = getCondition(weather.daily.weather_code[i]);
                const rainAmt = weather.daily.precipitation_sum[i]; // Actual rain from history
                return (
                  <div key={i} className="bg-[#1e293b]/40 p-5 rounded-3xl border border-slate-800 text-center">
                    <p className="text-[10px] text-slate-500 font-bold mb-3 uppercase tracking-tighter">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                    </p>
                    <div className={`text-3xl mb-3 ${dayInfo.color}`}>{dayInfo.icon}</div>
                    <p className="text-xl font-black">{Math.round(weather.daily.temperature_2m_max[i])}°</p>
                    <div className="mt-4 pt-3 border-t border-slate-800/50">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">{rainAmt}mm Recorded</p>
                      <p className="text-[9px] text-slate-600 font-bold uppercase mt-1">Rainfall</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NEXT 7 DAYS (Forecast) */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em]">Field Planning Forecast (Next 7 Days)</h3>
              <div className="h-px flex-1 bg-slate-800"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {weather.daily.time.slice(7).map((date, i) => {
                const idx = i + 7;
                const dayInfo = getCondition(weather.daily.weather_code[idx]);
                const rainProb = weather.daily.precipitation_probability_max[idx]; // Probability for future
                return (
                  <div key={idx} className="bg-[#1e293b] p-5 rounded-3xl border border-slate-700/50 text-center hover:border-emerald-500/50 transition-all shadow-xl">
                    <p className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-tighter">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                    </p>
                    <div className={`text-3xl mb-3 ${dayInfo.color}`}>{dayInfo.icon}</div>
                    <p className="text-xl font-black">{Math.round(weather.daily.temperature_2m_max[idx])}°</p>
                    <div className="mt-4 pt-3 border-t border-slate-800/50">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">{rainProb}% Chance</p>
                      <p className="text-[9px] text-slate-600 font-bold uppercase mt-1">Rainfall</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default RiceVisionWeather;