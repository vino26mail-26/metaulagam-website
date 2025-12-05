// src/pages/EnquiryPage.jsx
import { useState } from "react";
import "./EnquiryPage.css";

// ⬇⬇⬇ CHANGE THIS TO YOUR BACKEND URL ⬇⬇⬇
// If your backend runs locally on port 5000:
const API_BASE_URL = "http://localhost:5000";
// If your backend is on Render, use something like:
// const API_BASE_URL = "https://your-backend-name.onrender.com";

function EnquiryPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    const url = `${API_BASE_URL}/api/enquiries`;
    console.log("📡 POST URL =", url);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error("❌ Enquiry submit failed with status", res.status);
        throw new Error("Failed");
      }

      const data = await res.json();
      console.log("✅ Enquiry saved:", data);

      setStatus({
        type: "success",
        message: "Thank you! Your enquiry has been received.",
      });

      setForm({
        name: "",
        phone: "",
        email: "",
        course: "",
        message: "",
      });
    } catch (err) {
      console.error("❌ Error in handleSubmit:", err);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="enquiry-root">
      <div className="enquiry-card-wrap">
        <div className="enquiry-glow" />
        <div className="enquiry-card">
          <h1>Enquiry Form</h1>
          <p className="enquiry-sub">
            Tell us what you want to learn or build. We&apos;ll reply with
            course suggestions and next steps.
          </p>

          <form onSubmit={handleSubmit} className="enquiry-form">
            <div className="enquiry-row">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone / WhatsApp"
              />
            </div>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />

            <select
              name="course"
              value={form.course}
              onChange={handleChange}
            >
              <option value="">Select a course (optional)</option>
              <option value="VR Film Making">VR Film Making</option>
              <option value="3D Printing Basics">3D Printing Basics</option>
              <option value="AI Filmmaking">AI Filmmaking</option>
              <option value="Digital Film Making">Digital Film Making</option>
              <option value="MERN Stack">MERN Stack</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>

            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us your goals, current skills, or questions..."
              required
            />

            {status.message && (
              <div
                className={
                  status.type === "success"
                    ? "enquiry-status success"
                    : "enquiry-status error"
                }
              >
                {status.message}
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit Enquiry"}
            </button>

            <p className="enquiry-foot">
              We respect your time and privacy. No spam – only course guidance.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnquiryPage;
