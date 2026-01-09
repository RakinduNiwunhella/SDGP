export default function FiltersPanel() {
  return (
    <div className="w-72 bg-white rounded-xl shadow-sm p-4 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">Filters</h2>
        <button className="text-gray-400 hover:text-gray-600">
          ☰
        </button>
      </div>

      {/* Districts */}
      <div className="mb-5">
        <p className="text-sm font-medium text-gray-600 mb-2">Districts</p>
        <div className="space-y-2 text-sm">
          {["Naduwaththa", "Anuradhapura", "Polonnaruwa", "Dambulla"].map(
            (d) => (
              <label key={d} className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                {d}
              </label>
            )
          )}
        </div>
      </div>

      {/* Season */}
      <div className="mb-5">
        <p className="text-sm font-medium text-gray-600 mb-2">Season</p>
        <select className="w-full border rounded-md px-2 py-1 text-sm">
          <option>All seasons</option>
          <option>Maha</option>
          <option>Yala</option>
        </select>
      </div>

      {/* Date Range */}
      <div className="mb-5">
        <p className="text-sm font-medium text-gray-600 mb-2">Date Range</p>
        <div className="flex gap-2">
          <input
            type="date"
            className="border rounded-md px-2 py-1 text-sm w-full"
          />
          <input
            type="date"
            className="border rounded-md px-2 py-1 text-sm w-full"
          />
        </div>
      </div>

      {/* Health Status */}
      <div className="mb-5">
        <p className="text-sm font-medium text-gray-600 mb-2">Health Status</p>
        <div className="space-y-2 text-sm">
          {["Healthy", "Stressed", "Damaged"].map((s) => (
            <label key={s} className="flex items-center gap-2">
              <input type="checkbox" />
              {s}
            </label>
          ))}
        </div>
      </div>

      {/* Alert Type */}
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Alert Type</p>
        <div className="space-y-2 text-sm">
          {["Water Stress", "Flood Risk", "Disease Spread"].map((a) => (
            <label key={a} className="flex items-center gap-2">
              <input type="checkbox" />
              {a}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
