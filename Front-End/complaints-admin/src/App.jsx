import useComplaints from "./hooks/useComplaints";
import ComplaintsTable from "./components/admin/ComplaintsTable";
import AdminLayout from "./components/admin/AdminLayout";

export default function App() {
  const { complaints, loading } = useComplaints();

  if (loading) {
    return <p className="p-8">Loading complaints...</p>;
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Complaints</h1>
      <ComplaintsTable complaints={complaints} />
    </AdminLayout>
  );
}
