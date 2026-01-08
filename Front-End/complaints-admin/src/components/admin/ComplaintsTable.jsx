import { EyeIcon } from "@heroicons/react/24/outline";

const STATUS_STYLES = {
  New: "bg-red-100 text-red-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Resolved: "bg-green-100 text-green-700",
};

export default function ComplaintsTable({ complaints }) {
  if (!complaints || complaints.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-6 text-gray-500">
        No complaints found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left">Complaint ID</th>
            <th className="px-4 py-3 text-left">Full Name</th>
            <th className="px-4 py-3 text-left">Anonymous</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Province / District</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">
                {typeof c.id === "string"
                  ? c.id.slice(0, 8).toUpperCase()
                  : "—"}
              </td>

              <td className="px-4 py-3">
                {c.is_anonymous ? "Anonymous User" : c.full_name}
              </td>

              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                  {c.is_anonymous ? "Yes" : "No"}
                </span>
              </td>

              <td className="px-4 py-3">{c.complaint_type || "—"}</td>

              <td className="px-4 py-3">
                {c.province} / {c.district}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    STATUS_STYLES[c.status || "New"]
                  }`}
                >
                  {c.status || "New"}
                </span>
              </td>

              <td className="px-4 py-3">
                {new Date(c.created_at).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                <button className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-gray-100">
                  <EyeIcon className="w-4 h-4" />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
