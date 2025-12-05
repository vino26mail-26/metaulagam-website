// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

// ⬇⬇⬇ VERY IMPORTANT: backend URL, NOT 5173 ⬇⬇⬇
const API_BASE_URL = "http://localhost:5000"; 
// If your Node server logs a different port, change 5000 to that.

function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

    const url = `${API_BASE_URL}/api/auth/login`;
    console.log("🔐 LOGIN URL =", url);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // For debugging: if backend accidentally returns HTML
      const text = await res.text();
      console.log("🔍 Raw login response:", text);

      if (!res.ok) {
        setMsg({ type: "error", text: "Login failed" });
        return;
      }

      // Try to parse JSON (after confirming it's not HTML)
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        setMsg({
          type: "error",
          text: "Server did not return JSON. Check API_BASE_URL.",
        });
        return;
      }

      if (!data.token) {
        setMsg({
          type: "error",
          text: "No token in response. Check backend /api/auth/login.",
        });
        return;
      }

      // ✅ Store token + user
      localStorage.setItem("metaulagam_token", data.token);
      if (data.user) {
        localStorage.setItem("metaulagam_user", JSON.stringify(data.user));
      }

      setMsg({ type: "success", text: "Login successful!" });

      navigate("/admin", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setMsg({ type: "error", text: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-root">
      <div className="login-card-wrap">
        <div className="login-glow"></div>

        <div className="login-card">
          <h1>Admin Login</h1>
          <p className="login-sub">
            Enter your admin credentials to access your MetaUlagam dashboard.
          </p>

          {msg.text && (
            <p className={`login-msg ${msg.type === "error" ? "err" : "ok"}`}>
              {msg.text}
            </p>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="login-hint">
            Use your admin email from the <code>users</code> collection.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
