// src/pages/AdminPage.jsx
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../config";
import "./AdminPage.css";

function AdminPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedId, setSelectedId] = useState(null);

  const token = localStorage.getItem("metaulagam_token");
  const user = JSON.parse(localStorage.getItem("metaulagam_user") || "{}");

  // ---- Logout handler ----
  const handleLogout = () => {
    localStorage.removeItem("metaulagam_token");
    localStorage.removeItem("metaulagam_user");
    window.location.href = "/admin-login";
  };

  // ---- Load enquiries from backend ----
  useEffect(() => {
    async function fetchEnquiries() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/api/admin/enquiries`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Not authenticated. Please login as admin.");
          }
          throw new Error("Failed to load enquiries.");
        }

        async function handleDelete() {
  if (!selectedId) return;

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/enquiries/${selectedId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Delete failed");

    setEnquiries((prev) => prev.filter((item) => item._id !== selectedId));
    setFiltered((prev) => prev.filter((item) => item._id !== selectedId));

    setShowDeleteModal(false);
    setSelectedId(null);
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete enquiry");
  }
}


        const data = await res.json();
        const list = data.enquiries || data || [];
        setEnquiries(list);
      } catch (err) {
        setError(err.message || "Error loading enquiries");
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchEnquiries();
    } else {
      setLoading(false);
      setError("Not authenticated. Please login as admin.");
    }
  }, [token]);

  // ---- Unique course list for dropdown ----
  const courseOptions = useMemo(() => {
    const set = new Set();
    enquiries.forEach((e) => {
      if (e.course) set.add(e.course);
    });
    return ["All", ...Array.from(set)];
  }, [enquiries]);

  // ---- Stats (SaaS-style cards) ----
  const stats = useMemo(() => {
    const total = enquiries.length;

    const today = new Date();
    const todayCount = enquiries.filter((e) => {
      if (!e.createdAt) return false;
      const d = new Date(e.createdAt);
      return (
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth() &&
        d.getDate() === today.getDate()
      );
    }).length;

    const uniqueEmails = new Set(
      enquiries.map((e) => (e.email || "").toLowerCase())
    );
    const uniqueStudents = uniqueEmails.has("") ? uniqueEmails.size - 1 : uniqueEmails.size;

    const vrRelated = enquiries.filter((e) =>
      (e.course || "").toLowerCase().includes("vr")
    ).length;

    return { total, todayCount, uniqueStudents, vrRelated };
  }, [enquiries]);

  // ---- Filtered enquiries based on search + course ----
  const visibleEnquiries = useMemo(() => {
    const q = search.toLowerCase();
    return enquiries.filter((e) => {
      const matchesSearch =
        (e.name && e.name.toLowerCase().includes(q)) ||
        (e.email && e.email.toLowerCase().includes(q)) ||
        (e.phone && String(e.phone).toLowerCase().includes(q)) ||
        (e.course && e.course.toLowerCase().includes(q)) ||
        (e.message && e.message.toLowerCase().includes(q));

      const matchesCourse =
        courseFilter === "All" || e.course === courseFilter;

      return matchesSearch && matchesCourse;
    });
  }, [enquiries, search, courseFilter]);

  return (
    <div className="admin-page">
      {/* NAVBAR */}
      <nav className="admin-nav">
        <div className="admin-nav-left">
          <span className="admin-brand">MetaUlagam Admin</span>
          <a href="/admin" className="admin-nav-link">
            Dashboard
          </a>
          <a href="/courses" className="admin-nav-link">
            Courses
          </a>
        </div>

        <div className="admin-nav-right">
          <span className="admin-user">👤 {user.name || "Admin User"}</span>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="admin-content">
        {/* HEADER */}
        <header className="admin-header">
          <div>
            <h1>Enquiries Dashboard</h1>
            <p className="admin-sub">
              Track and manage all student enquiries submitted on your website.
            </p>
          </div>
        </header>

        {/* STATS ROW */}
        <section className="admin-stats">
          <div className="admin-stat-card">
            <p className="admin-stat-label">Total Enquiries</p>
            <p className="admin-stat-value">{stats.total}</p>
          </div>
          <div className="admin-stat-card">
            <p className="admin-stat-label">Today</p>
            <p className="admin-stat-value">{stats.todayCount}</p>
          </div>
          <div className="admin-stat-card">
            <p className="admin-stat-label">Unique Students</p>
            <p className="admin-stat-value">{stats.uniqueStudents}</p>
          </div>
          <div className="admin-stat-card">
            <p className="admin-stat-label">VR-related</p>
            <p className="admin-stat-value">{stats.vrRelated}</p>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="admin-filters">
          <div className="admin-search">
            <input
              type="text"
              placeholder="Search by name, email, phone, course, or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="admin-filter-right">
            <label className="admin-filter-label">
              Course
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                {courseOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <div className="admin-count-pill">
              Total: <span>{enquiries.length}</span>
            </div>
          </div>
        </section>

        {/* ERROR / TABLE */}
        {error && <div className="admin-error">{error}</div>}

        <section className="admin-table-container">
          {loading ? (
            <div className="admin-loading">Loading enquiries...</div>
          ) : !error && visibleEnquiries.length === 0 ? (
            <div className="admin-empty">
              No enquiries match your filters yet.
            </div>
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
                  {visibleEnquiries.map((e) => (
                    <tr key={e._id}>
                      <td>
                        <div className="admin-name-block">
                          <span className="admin-name">
                            {e.name || "Unknown"}
                          </span>
                          {e.email && (
                            <span className="admin-email">{e.email}</span>
                          )}
                        </div>
                      </td>
                      <td>{e.phone || "—"}</td>
                      <td>
                        <span className="admin-course">
                          {e.course || "Not specified"}
                        </span>
                      </td>
                      <td className="admin-msg" title={e.message || ""}>
                        {e.message || "—"}
                      </td>
                      <td>
                        {e.createdAt
                          ? new Date(e.createdAt).toLocaleString()
                          : "—"}
                      </td>
                      <td>
  <button
    className="delete-btn"
    onClick={() => {
      setSelectedId(e._id);
      setShowDeleteModal(true);
    }}
  >
    Delete
  </button>
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );

  {showDeleteModal && (
  <div className="modal-overlay">
    <div className="modal-card">
      <h3>Delete Enquiry?</h3>
      <p>This action cannot be undone.</p>

      <div className="modal-actions">
        <button className="modal-cancel" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </button>

        <button className="modal-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  </div>
)}

}

export default AdminPage;
