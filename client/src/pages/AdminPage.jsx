import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString();
}

function AdminPage() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [status, setStatus] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("metaulagam_user"));

  const load = async () => {
    setLoading(true);
    const token = localStorage.getItem("metaulagam_token");

    const res = await fetch(`${API_BASE_URL}/api/admin/enquiries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      setStatus("Unauthorized. Redirecting...");
      localStorage.removeItem("metaulagam_token");
      return navigate("/login");
    }

    const data = await res.json();
    setEnquiries(data);
    setStatus(`Loaded ${data.length} enquiries.`);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("metaulagam_token");
    localStorage.removeItem("metaulagam_user");
    navigate("/login");
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-gray-600 font-semibold">
              {user.name}
            </span>
          )}

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

          <button
            onClick={load}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* STATUS */}
      <p className="mb-4 text-gray-700">{status}</p>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center text-lg mt-6">Loading enquiries...</div>
      )}

      {/* EMPTY STATE */}
      {!loading && enquiries.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-6">
          No enquiries found.
        </div>
      )}

      {/* TABLE */}
      {!loading && enquiries.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Created</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Course</th>
                <th className="border p-2">Message</th>
              </tr>
            </thead>

            <tbody>
              {enquiries.map((e) => (
                <tr key={e._id} className="hover:bg-gray-50">
                  <td className="border p-2">{formatDate(e.createdAt)}</td>
                  <td className="border p-2">{e.name}</td>
                  <td className="border p-2">{e.email}</td>
                  <td className="border p-2">{e.course}</td>
                  <td className="border p-2">{e.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
