// src/pages/EnquiryPage.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./EnquiryPage.css";

function EnquiryPage() {
  const location = useLocation();

  // Course coming from CoursesPage (if user clicked "Enquire for this course")
  const selectedFromCourses =
    location.state && location.state.selectedCourse
      ? location.state.selectedCourse
      : "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState(selectedFromCourses);
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState(""); // success / error text
  const [statusType, setStatusType] = useState("info"); // "success" | "error"
  const [loading, setLoading] = useState(false);

  // If user navigates again from Courses with another course
  useEffect(() => {
    if (selectedFromCourses) {
      setCourse(selectedFromCourses);
    }
  }, [selectedFromCourses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setStatusType("info");
    setLoading(true);

    try {
      const url = `${API_BASE_URL}/api/enquiries`;
      console.log("📡 Enquiry POST URL =", url);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, course, message }),
      });

      const text = await res.text();
      console.log("🔍 RAW ENQUIRY RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response. Please try again later.");
      }

      if (!res.ok) {
        throw new Error(
          data.error || data.message || "Failed to send enquiry."
        );
      }

      // ✅ success
      setStatusType("success");
      setStatus("Thank you! Your enquiry has been submitted.");
      setName("");
      setPhone("");
      setEmail("");
      // keep course so they remember what they chose
      setMessage("");
    } catch (err) {
      console.error("❌ Enquiry error:", err);
      setStatusType("error");
      setStatus(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry-page">
      {/* TOP NAV – same family as Courses/Admin */}
      <header className="enquiry-nav">
        <div className="enquiry-nav-inner">
          <span className="enquiry-brand">MetaUlagam Academy</span>
          <nav className="enquiry-nav-links">
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/enquiry" className="active-link">
              Enquiry
            </Link>
            <Link to="/admin-login">Admin</Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="enquiry-content">
        <section className="enquiry-layout">
          {/* LEFT: TEXT / INFO */}
          <div className="enquiry-info">
            <p className="enquiry-kicker">ENQUIRY</p>
            <h1>Tell us what you want to build</h1>
            <p className="enquiry-sub">
              Whether it&apos;s VR film making, AI tools, 3D printing or a full
              film course – share your details and I&apos;ll reply personally
              with batches, fees and the best path for you.
            </p>

            <ul className="enquiry-bullets">
              <li>1:1 call after your enquiry (no spam).</li>
              <li>Guidance on which course fits your goal.</li>
              <li>Project-based learning – not boring theory.</li>
            </ul>

            <div className="enquiry-note">
              <span className="note-dot" />
              All messages come directly to the mentor, not a sales team.
            </div>
          </div>

          {/* RIGHT: FORM CARD */}
          <div className="enquiry-card-wrap">
            <div className="enquiry-card-glow" />
            <div className="enquiry-card">
              <h2>Enquiry Form</h2>
              <p className="enquiry-card-sub">
                Fill this form and I&apos;ll get back with schedule & next
                steps.
              </p>

              {status && (
                <div
                  className={`enquiry-status enquiry-status-${statusType}`}
                >
                  {status}
                </div>
              )}

              <form className="enquiry-form" onSubmit={handleSubmit}>
                {/* Name */}
                <label className="enquiry-field">
                  <span>Name</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                {/* Phone */}
                <label className="enquiry-field">
                  <span>Phone</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Optional, but helps for WhatsApp follow-up"
                  />
                </label>

                {/* Email */}
                <label className="enquiry-field">
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                {/* Course */}
                <label className="enquiry-field">
                  <span>Course</span>
                  <input
                    type="text"
                    required
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="VR Film Making, 3D Printing Basics, AI Film Making..."
                  />
                  {selectedFromCourses && (
                    <p className="enquiry-help">
                      Selected from courses page:{" "}
                      <strong>{selectedFromCourses}</strong>
                    </p>
                  )}
                </label>

                {/* Message */}
                <label className="enquiry-field">
                  <span>Message</span>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your goal. Example: I am a VisCom student, I want a portfolio for film/VR..."
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="enquiry-submit"
                >
                  {loading ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default EnquiryPage;
