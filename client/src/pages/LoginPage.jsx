// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./LoginPage.css"; // ✅ NEW: CSS-based UI

function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      console.log("📡 LOGIN POST:", `${API_BASE_URL}/api/auth/login`);

      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      console.log("🔍 RAW LOGIN RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response. Check backend URL.");
      }

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        setLoading(false);
        return;
      }

      if (!data.token) {
        throw new Error("No token received from server.");
      }

      // ✅ STORE TOKEN FOR ADMIN
      localStorage.setItem("metaulagam_token", data.token);
      localStorage.setItem("metaulagam_user", JSON.stringify(data.user || {}));

      console.log("✅ Stored token:", data.token);

      // Go to dashboard
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("❌ Login error:", error);
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* background glow */}
      <div className="login-bg-glow" />

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span>MU</span>
          </div>
          <div className="login-brand">
            <p className="login-brand-title">MetaUlagam Academy</p>
            <p className="login-brand-sub">Admin Console</p>
          </div>
        </div>

        <h2 className="login-title">Admin Login</h2>
        <p className="login-subtitle">
          Enter your admin credentials to access your MetaUlagam dashboard.
        </p>

        {message && (
          <div className="login-message login-message-error">
            {message}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span className="login-label">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </label>

          <label className="login-field">
            <span className="login-label">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-hint">
          Use your admin user from the <code>users</code> collection (role:{" "}
          <span>admin</span>).
        </p>

        <button
          type="button"
          className="login-back"
          onClick={() => navigate("/")}
        >
          ← Back to site
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
