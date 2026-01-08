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
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&past_days=7&timezone=auto`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Connection failed.");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [LAT, LON]);

  useEffect(() => { fetchAgroWeather(); }, [fetchAgroWeather]);

  const getCondition = (code) => {
    if (code === 0) return { desc: "Optimal Day", icon: "☀️", color: "text-amber-400" };
    if (code <= 3) return { desc: "Good for Field", icon: "⛅", color: "text-emerald-300" };
    if (code >= 51 && code <= 67) return { desc: "Wet/Rainy", icon: "🌧️", color: "text-blue-400" };
    return { desc: "Moderate Skies", icon: "☁️", color: "text-slate-400" };
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-[#050810] text-emerald-500 font-bold text-xs uppercase tracking-widest">Updating Field Data...</div>;
  if (error) return <div className="flex h-screen items-center justify-center bg-[#050810] p-6 text-emerald-400 font-bold">{error}</div>;

  const currentInfo = getCondition(weather.current.weather_code);
  const todayChance = weather.daily.precipitation_probability_max[7];

  return (
    <div className="min-h-screen bg-[#050810] p-4 md:p-10 text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-black text-white uppercase tracking-tight">Colombo Station</h1>
          <p className="text-slate-500 text-sm mt-1 font-bold uppercase tracking-wider">Paddy Field Intelligence Network</p>
        </header>

        {/* --- MAIN TODAY SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Main Temperature & Today's Outlook */}
          <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-950 p-10 rounded-[3rem] relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="z-10">
              <h2 className="text-8xl font-black text-white">{Math.round(weather.current.temperature_2m)}°C</h2>
              <div className="mt-8 flex gap-3">
                <span className="bg-white/10 px-5 py-2 rounded-full text-[10px] font-black border border-white/20 uppercase tracking-widest">{currentInfo.desc}</span>
                <span className="bg-blue-500/20 px-5 py-2 rounded-full text-[10px] font-black border border-blue-400/30 text-blue-100 uppercase tracking-widest">{todayChance}% Rain Chance</span>
              </div>
            </div>
            <span className="absolute right-[-20px] bottom-[-40px] text-[18rem] opacity-20 pointer-events-none select-none">{currentInfo.icon}</span>
          </div>

          {/* Moisture & Cloud Density Card */}
          <div className="bg-[#111827] p-8 rounded-[2.5rem] border border-slate-800 space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-slate-500 uppercase">Air Moisture</span>
                <span className="text-2xl font-black text-emerald-400">{weather.current.relative_humidity_2m}%</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Humidity over 85% increases the risk of fungal diseases.</p>
              <div className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase inline-block ${weather.current.relative_humidity_2m > 85 ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {weather.current.relative_humidity_2m > 85 ? 'High Disease Risk' : 'Low Disease Risk'}
              </div>
            </div>
            <div className="space-y-3 border-t border-slate-800 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-slate-500 uppercase">Cloud Density</span>
                <span className="text-2xl font-black text-emerald-400">{weather.current.cloud_cover}%</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Low cloud density ensures maximum sunlight for growth.</p>
              <div className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase inline-block ${weather.current.cloud_cover > 70 ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {weather.current.cloud_cover > 70 ? 'Poor Sunlight' : 'Excellent Sunlight'}
              </div>
            </div>
          </div>

          {/* Wind & Rain Card */}
          <div className="bg-[#111827] p-8 rounded-[2.5rem] border border-slate-800 space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-slate-500 uppercase">Wind Speed</span>
                <span className="text-2xl font-black text-emerald-400">{weather.current.wind_speed_10m} km/h</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Winds above 15 km/h make spraying fertilizer unsafe.</p>
              <div className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase inline-block ${weather.current.wind_speed_10m > 15 ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {weather.current.wind_speed_10m > 15 ? 'Bad for Spraying' : 'Good for Spraying'}
              </div>
            </div>
            <div className="space-y-3 border-t border-slate-800 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-slate-500 uppercase">Surface Rain</span>
                <span className="text-2xl font-black text-emerald-400">{weather.current.precipitation} mm</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Heavy rain washes away fertilizer and floods nurseries.</p>
              <div className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase inline-block ${weather.current.precipitation > 5 ? 'bg-blue-500/10 text-blue-300' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {weather.current.precipitation > 5 ? 'Flooding Risk' : 'Normal Water'}
              </div>
            </div>
          </div>
        </div>

        {/* --- DUAL TIMELINE LOGS --- */}
        <div className="space-y-16">
          <section>
            <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mb-8">Planning Forecast (Next 7 Days)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {weather.daily.time.slice(7).map((date, i) => {
                const idx = i + 7;
                const info = getCondition(weather.daily.weather_code[idx]);
                return (
                  <div key={idx} className="bg-[#111827] p-6 rounded-3xl border border-slate-800 text-center hover:border-emerald-500/50 transition-all shadow-xl">
                    <p className="text-[10px] text-slate-500 font-black mb-3">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}</p>
                    <div className={`text-4xl mb-4 ${info.color}`}>{info.icon}</div>
                    <p className="text-2xl font-black">{Math.round(weather.daily.temperature_2m_max[idx])}°</p>
                    <p className="text-[10px] font-black text-blue-400 uppercase mt-4">{weather.daily.precipitation_probability_max[idx]}% Rain</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.3em] mb-8 border-t border-slate-800 pt-8">Field History (Past 7 Days)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {weather.daily.time.slice(0, 7).map((date, i) => {
                const info = getCondition(weather.daily.weather_code[i]);
                return (
                  <div key={i} className="bg-[#111827]/40 p-6 rounded-3xl border border-slate-800/50 text-center grayscale opacity-60">
                    <p className="text-[10px] text-slate-600 font-bold mb-3">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}</p>
                    <div className="text-3xl mb-4">{info.icon}</div>
                    <p className="text-2xl font-bold">{Math.round(weather.daily.temperature_2m_max[i])}°</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase mt-4">{weather.daily.precipitation_sum[i]}mm Rain</p>
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