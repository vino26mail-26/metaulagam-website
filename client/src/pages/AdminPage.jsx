import { useEffect, useState } from "react";
import "./AdminPage.css";
import { API_BASE_URL } from "../config";

function AdminPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Correct token key used across your app
  const token = localStorage.getItem("metaulagam_token");

  useEffect(() => {
    async function fetchEnquiries() {
      try {
        setLoading(true);
        setError("");

        console.log("📡 Calling backend:", `${API_BASE_URL}/api/admin/enquiries`);

        const res = await fetch(`${API_BASE_URL}/api/admin/enquiries`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // handle API errors
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Not authenticated. Please login as admin.");
          }
          throw new Error("Failed to load enquiries.");
        }

        // ✅ CORRECT — parse JSON directly (no more html/parse errors)
        const data = await res.json();
        console.log("🔍 JSON Response:", data);

        const list = data.enquiries || data || [];
        setEnquiries(list);
        setFiltered(list);

      } catch (err) {
        console.error("❌ Error fetching enquiries:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // only fetch if logged in
    if (token) {
      fetchEnquiries();
    } else {
      setLoading(false);
      setError("Not authenticated. Please login as admin.");
    }
  }, [token]);


  // 🔍 filtering search results
  useEffect(() => {
    const q = search.toLowerCase();

    const results = enquiries.filter((e) => {
      return (
        (e.name && e.name.toLowerCase().includes(q)) ||
        (e.email && e.email.toLowerCase().includes(q)) ||
        (e.phone && e.phone.toLowerCase().includes(q)) ||
        (e.course && e.course.toLowerCase().includes(q))
      );
    });

    setFiltered(results);
  }, [search, enquiries]);


  return (
    <div className="admin-root">
      <div className="admin-inner">

        {/* HEADER */}
        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN</p>
            <h1>Enquiries Dashboard</h1>
            <p className="admin-sub">
              Manage and review all student enquiries submitted on MetaUlagam.
            </p>
          </div>

          <div className="admin-pill">
            Total enquiries: <span>{enquiries.length}</span>
          </div>
        </header>

        {/* PANEL */}
        <section className="admin-panel-wrap">
          <div className="admin-panel-glow" />
          <div className="admin-panel">

            {/* Search box */}
            <div className="admin-search-row">
              <input
                type="text"
                placeholder="Search by name, email, phone, or course..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="admin-table-wrap">
              {loading ? (
                <div className="admin-state">Loading enquiries...</div>
              ) : error ? (
                <div className="admin-state admin-error">{error}</div>
              ) : filtered.length === 0 ? (
                <div className="admin-state">No enquiries found.</div>
              ) : (
                <div className="admin-table-scroll">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Course</th>
                        <th>Message</th>
                        <th>Created</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((e) => (
                        <tr key={e._id}>
                          <td>
                            <div className="admin-name">
                              <span className="admin-name-main">
                                {e.name || "-"}
                              </span>
                              {e.email && (
                                <span className="admin-name-sub">
                                  {e.email}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="admin-contact">{e.phone || "—"}</td>

                          <td>
                            <span className="admin-course-pill">
                              {e.course || "Not specified"}
                            </span>
                          </td>

                          <td className="admin-message">
                            {e.message || "—"}
                          </td>

                          <td className="admin-date">
                            {e.createdAt
                              ? new Date(e.createdAt).toLocaleString()
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
