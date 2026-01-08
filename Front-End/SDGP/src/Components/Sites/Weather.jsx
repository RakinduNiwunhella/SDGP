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

      // Fetching Today + 7 Day Forecast + 7 Day History
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&past_days=7&timezone=auto`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Sync Interrupted");
      
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
    if (code === 0) return { desc: "Optimal Day", icon: "☀️", color: "text-amber-400" };
    if (code <= 3) return { desc: "Good for Field", icon: "⛅", color: "text-emerald-300" };
    if (code >= 51 && code <= 67) return { desc: "Wet/Rainy", icon: "🌧️", color: "text-blue-400" };
    return { desc: "Moderate Skies", icon: "☁️", color: "text-slate-400" };
  };

  if (loading) return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#050810] text-emerald-500 font-black text-xs tracking-widest animate-pulse">
      SYNCING FIELD DATA...
    </div>
  );

  if (error) return (
    <div className="flex h-screen items-center justify-center bg-[#050810] p-6 text-center">
      <button onClick={fetchAgroWeather} className="text-emerald-400 border border-emerald-500/30 px-6 py-2 rounded-full text-xs font-bold">
        {error} - Tap to Reconnect
      </button>
    </div>
  );

  const currentInfo = getCondition(weather.current.weather_code);
  const todayChance = weather.daily.precipitation_probability_max[7]; //

  return (
    <div className="min-h-screen bg-[#050810] p-4 md:p-10 text-slate-200 font-sans selection:bg-emerald-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Live Monitoring</span>
            </div>
            <h1 className="text-4xl font-black text-white">Colombo Station</h1>
            <p className="text-slate-500 text-sm mt-1">Sri Lanka Paddy Field Management Network</p>
          </div>
        </header>

        {/* --- MAIN TODAY SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Temperature & Main Advisory */}
          <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-950 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="z-10">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Current Temperature</p>
              <h2 className="text-8xl font-black text-white">{Math.round(weather.current.temperature_2m)}°C</h2>
              <div className="mt-8 flex gap-3">
                <span className="bg-white/10 backdrop-blur-xl px-5 py-2 rounded-full text-xs font-black uppercase border border-white/20">
                  {currentInfo.desc}
                </span>
                <span className="bg-blue-500/20 backdrop-blur-xl px-5 py-2 rounded-full text-xs font-black uppercase border border-blue-400/30 text-blue-200">
                  {todayChance}% Rain Chance
                </span>
              </div>
            </div>
            <span className="absolute right-[-20px] bottom-[-40px] text-[18rem] opacity-20 pointer-events-none select-none">{currentInfo.icon}</span>
          </div>

          {/* Moisture & Cloud Density */}
          <div className="bg-[#111827] p-8 rounded-[2.5rem] border border-slate-800 space-y-8 shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-black text-slate-500 uppercase">Air Moisture</span>
                <span className="text-2xl font-black text-emerald-400">{weather.current.relative_humidity_2m}%</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-400 font-medium">
                Higher moisture (above 80%) increases the risk of fungal diseases and grain rot.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-black text-slate-500 uppercase">Cloud Density</span>
                <span className="text-2xl font-black text-emerald-400">{weather.current.cloud_cover}%</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-400 font-medium">
                Determines sunlight availability. Low density is best for maximum paddy growth.
              </p>
            </div>
          </div>

          {/* Wind & Rain Detail */}
          <div className="bg-[#111827] p-8 rounded-[2.5rem] border border-slate-800 space-y-8 shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-black text-slate-500 uppercase">Wind Speed</span>
                <span className="text-2xl font-black text-emerald-400">{weather.current.wind_speed_10m} <small className="text-[10px] font-bold">km/h</small></span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-400 font-medium">
                Keep below 15 km/h for spraying fertilizer to avoid drift.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-black text-slate-500 uppercase">Surface Rain</span>
                <span className="text-2xl font-black text-emerald-400">{weather.current.precipitation} <small className="text-[10px] font-bold">mm</small></span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-400 font-medium">
                Measured rain on the ground. Excessive rain may wash away fresh fertilizer.
              </p>
            </div>
          </div>
        </div>

        {/* --- DUAL TIMELINE LOGS --- */}
        <div className="space-y-16">
          
          {/* ROW 1: FUTURE PLANNING (Next 7 Days) */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em]">Planning Forecast (Next 7 Days)</h3>
              <div className="h-px flex-1 bg-emerald-500/10"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {weather.daily.time.slice(7).map((date, i) => {
                const idx = i + 7;
                const info = getCondition(weather.daily.weather_code[idx]);
                return (
                  <div key={idx} className="bg-[#111827] p-6 rounded-3xl border border-slate-800 text-center hover:border-emerald-500/50 transition-all">
                    <p className="text-[10px] text-slate-500 font-black mb-3 uppercase tracking-tighter">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                    </p>
                    <div className={`text-4xl mb-4 ${info.color}`}>{info.icon}</div>
                    <p className="text-2xl font-black text-white">{Math.round(weather.daily.temperature_2m_max[idx])}°</p>
                    <div className="mt-5 pt-4 border-t border-slate-800/50">
                      <p className="text-[10px] font-black text-blue-400 uppercase">{weather.daily.precipitation_probability_max[idx]}% Chance</p>
                      <p className="text-[8px] text-slate-600 font-bold uppercase mt-1 tracking-widest">Expected Rain</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ROW 2: HISTORICAL LOG (Past 7 Days) */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Field History (Past 7 Days)</h3>
              <div className="h-px flex-1 bg-slate-800"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {weather.daily.time.slice(0, 7).map((date, i) => {
                const info = getCondition(weather.daily.weather_code[i]);
                return (
                  <div key={i} className="bg-[#111827]/40 p-6 rounded-3xl border border-slate-800/50 text-center">
                    <p className="text-[10px] text-slate-600 font-bold mb-3 uppercase tracking-tighter">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                    </p>
                    <div className={`text-3xl mb-4 opacity-50`}>{info.icon}</div>
                    <p className="text-2xl font-bold text-slate-400">{Math.round(weather.daily.temperature_2m_max[i])}°</p>
                    <div className="mt-5 pt-4 border-t border-slate-800/30">
                      <p className="text-[10px] font-black text-slate-500 uppercase">{weather.daily.precipitation_sum[i]}mm Actual</p>
                      <p className="text-[8px] text-slate-700 font-bold uppercase mt-1 tracking-widest">Recorded Rain</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default RiceVisionWeather;