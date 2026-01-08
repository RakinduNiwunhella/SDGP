// MyDashboard.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const StatWidget = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

const ProgressWidget = ({ label, value, color }) => {
  const bar = {
    green: "bg-emerald-500",
    blue: "bg-blue-500",
    yellow: "bg-amber-400",
  };

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          className={`h-2 rounded-full ${bar[color]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};


const ndviData = [
  { day: "14 Oct", value: 0.38 },
  { day: "19 Oct", value: 0.29 },
  { day: "24 Oct", value: 0.45 },
  { day: "29 Oct", value: 0.45 },
  { day: "4 Nov", value: 0.62 },
  { day: "9 Nov", value: 0.78 },
  { day: "14 Nov", value: 0.69 },
  { day: "19 Nov", value: 0.82 },
];

const outbreaks = [
  {
    title: "Blast Disease",
    district: "Kurunegala",
    date: "2025-08-12",
    status: "Under Review",
    severity: "Medium",
    notes: "Leaf blast patterns detected via NDVI anomaly",
  },
  {
    title: "Drought Stress",
    district: "Polonnaruwa",
    date: "2025-07-29",
    status: "Pending",
    severity: "Low",
    notes: "Sustained moisture deficit for 10 days",
  },
  {
    title: "Flood Damage",
    district: "Ampara",
    date: "2025-07-15",
    status: "Confirmed",
    severity: "High",
    notes: "Backwater index spike after rainfall event",
  },
];



const MyDashboard = () => {
  const [selectedOutbreak, setSelectedOutbreak] = useState(null);
  const [yieldForecast, setYieldForecast] = useState(null);
  const [healthStats, setHealthStats] = useState([]);
  const [healthyPercent, setHealthyPercent] = useState(0);

useEffect(() => {
  const fetchYieldForecast = async () => {
    const { data, error } = await supabase
      .from("yield_forecast_view")
      .select("*")
      .eq("district", "kurunegala");

    console.log("Yield data:", data);
    console.log("Yield error:", error);

    if (error) {
      setYieldForecast(null);
      return;
    }

    if (data && data.length > 0) {
      setYieldForecast(data[0]);
    } else {
      setYieldForecast(null);
    }
  };

  fetchYieldForecast();
}, []);

useEffect(() => {
  const fetchHealthDistribution = async () => {
    const { data, error } = await supabase
      .from("final_ml_predictions")
      .select("paddy_health");

    if (error) {
      console.error("Health distribution error:", error);
      setHealthStats([]);
      return;
    }

    const counts = {};
    data.forEach((row) => {
      const key = row.paddy_health;
      if (!key || key.toLowerCase() === "not applicable") return;
      counts[key] = (counts[key] || 0) + 1;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    const healthyCount =
      (counts["Normal"] || 0) +
      (counts["Healthy"] || 0);

    const healthyPercentValue = total
      ? Math.round((healthyCount / total) * 100)
      : 0;

    const formatted = Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      percent: Math.round((value / total) * 100),
    }));

    setHealthyPercent(healthyPercentValue);
    setHealthStats(formatted);
  };

  fetchHealthDistribution();
}, []);

  const formatMT = (value) => {
    if (!value) return "-";
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M MT";
    if (value >= 1_000) return (value / 1_000).toFixed(1) + "K MT";
    return value.toFixed(1) + " MT";
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto">

      {/* NATIONAL OVERVIEW */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          National Overview
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: Sep 28, 2025 · 02:00 PM
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
              Field Health Distribution
            </h3>

            <div className="flex gap-6 items-center">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={healthStats}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {healthStats.map((_, index) => (
                      <Cell
                        key={index}
                        fill={["#10b981", "#f59e0b", "#ef4444"][index % 3]}
                      />
                    ))}
                  </Pie>

                  <text
                    x="50%"
                    y="45%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-800 dark:fill-white text-xl font-semibold"
                  >
                    {healthyPercent}%
                  </text>

                  <text
                    x="50%"
                    y="58%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-500 dark:fill-gray-400 text-xs"
                  >
                    Healthy
                  </text>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="text-sm space-y-2">
                {healthStats.map((h) => (
                  <p key={h.name} className="text-gray-700 dark:text-gray-300">
                    {h.name} — {h.percent}%
                  </p>
                ))}
              </div>
            </div>
          </div>

          <StatWidget
            title="Yield Forecast (MT)"
            value={
              yieldForecast
                ? formatMT(yieldForecast.total_yield_tons)
                : "Loading..."
            }
            subtitle={
              yieldForecast
                ? `Confidence: ${yieldForecast.confidence}%`
                : null
            }
          />

          <StatWidget
            title="Expected Shortfall (MT)"
            value="220K MT"
            subtitle="vs 3.0M MT demand"
          />
        </div>
      </div>

      {/* OUTBREAKS */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Outbreaks
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Disease and pest outbreak monitoring
        </p>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm">
          {outbreaks.map((o, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl cursor-pointer"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {o.title} – {o.district}
                </p>
                <p className="text-sm text-gray-500">{o.date}</p>
              </div>

              <button
                onClick={() => setSelectedOutbreak(o)}
                className="text-sm text-blue-600 hover:underline"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* LOWER ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
            National NDVI Trend (30 days)
          </h3>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={ndviData}>
              <XAxis dataKey="day" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-3">
            <ProgressWidget label="Vegetation Recovery" value={82} color="green" />
            <ProgressWidget label="Moisture Stability" value={67} color="blue" />
            <ProgressWidget label="Stress Reduction" value={54} color="yellow" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
            District Health Overview
          </h3>

          {[
            ["Galle", "75%", "580 MT"],
            ["Anuradhapura", "79%", "793 MT"],
            ["Hambantota", "63%", "352 MT"],
            ["Ampara", "89%", "620 MT"],
          ].map(([d, h, y], i) => (
            <div
              key={i}
              className="flex justify-between px-4 py-3 text-sm text-gray-600 dark:text-gray-300"
            >
              <span className="font-medium">{d}</span>
              <span>{h} Healthy · {y}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SIDE DRAWER */}
      {selectedOutbreak && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="w-full sm:w-[420px] bg-white dark:bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-lg font-semibold mb-2">
              {selectedOutbreak.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {selectedOutbreak.district} · {selectedOutbreak.date}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {selectedOutbreak.notes}
            </p>

            <button
              onClick={() => setSelectedOutbreak(null)}
              className="mt-6 w-full py-2 rounded-lg bg-gray-900 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDashboard;