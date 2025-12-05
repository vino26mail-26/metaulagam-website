import { useEffect, useState, useMemo } from "react";
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
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("metaulagam_user"));

  const load = async () => {
    setLoading(true);
    const token = localStorage.getItem("metaulagam_token");

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/enquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        setStatus("Unauthorized. Redirecting...");
        localStorage.removeItem("metaulagam_token");
        localStorage.removeItem("metaulagam_user");
        return navigate("/login");
      }

      if (!res.ok) {
        setStatus("Failed to load enquiries.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setEnquiries(data);
      setStatus(`Loaded ${data.length} enquiries.`);
    } catch (err) {
      console.error("Error loading enquiries:", err);
      setStatus("Error loading enquiries.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("metaulagam_token");
    localStorage.removeItem("metaulagam_user");
    navigate("/login");
  };

  useEffect(() => {
    load();
  }, []);

  // 🔍 Filtered list based on search
  const filteredEnquiries = useMemo(() => {
    if (!search.trim()) return enquiries;

    const s = search.toLowerCase();

    return enquiries.filter((e) => {
      return (
        (e.name && e.name.toLowerCase().includes(s)) ||
        (e.email && e.email.toLowerCase().includes(s)) ||
        (e.course && String(e.course).toLowerCase().includes(s)) ||
        (e.message && e.message.toLowerCase().includes(s))
      );
    });
  }, [search, enquiries]);

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4">
      {/* TOP BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="text-gray-600 text-sm mt-1">{status}</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {user && (
            <span className="text-gray-700 text-sm sm:text-base">
              👤 {user.name}
            </span>
          )}

          <button
            onClick={load}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS + SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="text-sm text-gray-700">
          <span className="font-semibold">
            Total: {enquiries.length}
          </span>
          {" · "}
          <span>
            Showing: {filteredEnquiries.length}
          </span>
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by name, email, course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-lg mt-6">Loading enquiries...</div>
      )}

      {/* EMPTY STATES */}
      {!loading && enquiries.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-6">
          No enquiries found.
        </div>
      )}

      {!loading && enquiries.length > 0 && filteredEnquiries.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-6">
          No enquiries match your search.
        </div>
      )}

      {/* TABLE */}
      {!loading && filteredEnquiries.length > 0 && (
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse border text-sm bg-white">
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
              {filteredEnquiries.map((e) => (
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
