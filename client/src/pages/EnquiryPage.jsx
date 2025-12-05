import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

function EnquiryPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const preselected = urlParams.get("course") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState(preselected);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, course, message }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus(data.message || "Failed to send enquiry.");
      return;
    }

    setStatus("Enquiry sent successfully! We will contact you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Enquiry Form</h2>
      {status && <p>{status}</p>}

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <label>Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <label>Course</label>
        <input
          required
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <label>Message</label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", padding: "8px", minHeight: "100px" }}
        />

        <button style={{ marginTop: "10px", padding: "10px 20px" }}>
          Send Enquiry
        </button>
      </form>
    </div>
  );
}

export default EnquiryPage;
