// MyDashboard.jsx
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* =========================
   REUSABLE WIDGETS
========================= */

const StatWidget = ({ title, value, subtitle, tone }) => {
  const tones = {
    green: "bg-green-50 dark:bg-green-900/20 border-green-200 text-green-700",
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 text-blue-700",
    red: "bg-red-50 dark:bg-red-900/20 border-red-200 text-red-600",
  };

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};

const ProgressWidget = ({ label, value, color }) => {
  const bar = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
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

/* =========================
   MOCK DATA (API READY)
========================= */

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

/* =========================
   MAIN COMPONENT
========================= */

const MyDashboard = () => {
  const [selectedOutbreak, setSelectedOutbreak] = useState(null);

  return (
    <div className="space-y-12 relative">

      {/* ================= NATIONAL OVERVIEW ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          National Overview
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: Sep 28, 2025 · 02:00 PM
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white dark:bg-slate-800 border rounded-xl p-6">
            <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-200">
              Field Health Distribution
            </h3>

            <div className="flex gap-6 items-center">
              <div className="w-28 h-28 rounded-full border-8 border-green-400 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-700 dark:text-white">
                  81%
                </span>
              </div>

              <div className="text-sm space-y-2">
                <p className="text-green-600">Healthy Fields — 81%</p>
                <p className="text-yellow-500">Stressed Fields — 12%</p>
                <p className="text-red-500">Severely Stressed — 7%</p>
              </div>
            </div>
          </div>

          <StatWidget
            title="Yield Forecast (MT)"
            value="2.78M MT"
            subtitle="Confidence: 76%"
            tone="blue"
          />

          <StatWidget
            title="Expected Shortfall (MT)"
            value="220K MT"
            subtitle="vs 3.0M MT demand"
            tone="red"
          />

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatWidget
              title="Active Monitoring Zones"
              value="42"
              subtitle="Satellite tracked regions"
              tone="green"
            />
            <StatWidget
              title="Data Latency"
              value="~12 hrs"
              subtitle="Avg satellite refresh"
              tone="blue"
            />
            <StatWidget
              title="Alerts Generated"
              value="18"
              subtitle="Last 7 days"
              tone="red"
            />
          </div>
        </div>
      </div>

      {/* ================= OUTBREAKS ================= */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Outbreaks
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Disease and pest outbreak monitoring
        </p>

        <div className="bg-white dark:bg-slate-800 border rounded-xl p-6 space-y-4">
          {outbreaks.map((o, i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-lg px-4 py-3"
            >
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  {o.title} – {o.district}
                </p>
                <p className="text-sm text-gray-500">{o.date}</p>
              </div>

              <button
                onClick={() => setSelectedOutbreak(o)}
                className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= LOWER ANALYTICS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 border rounded-xl p-6">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-200">
            National NDVI Trend (30 days)
          </h3>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ndviData}>
              <XAxis dataKey="day" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
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

        <div className="bg-white dark:bg-slate-800 border rounded-xl p-6">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-200">
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
              className="flex justify-between border rounded-lg px-4 py-3 mb-2"
            >
              <span className="font-medium">{d}</span>
              <span className="text-sm text-gray-500">{h} Healthy · {y}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SIDE DRAWER ================= */}
      {selectedOutbreak && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="w-full sm:w-[420px] bg-white dark:bg-slate-900 p-6 space-y-4">
            <h3 className="text-lg font-semibold">
              {selectedOutbreak.title}
            </h3>
            <p><b>District:</b> {selectedOutbreak.district}</p>
            <p><b>Status:</b> {selectedOutbreak.status}</p>
            <p><b>Severity:</b> {selectedOutbreak.severity}</p>
            <p className="text-sm text-gray-500">
              {selectedOutbreak.notes}
            </p>

            <button
              onClick={() => setSelectedOutbreak(null)}
              className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md"
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