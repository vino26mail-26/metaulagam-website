import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* HERO SECTION */}
      <section
        style={{
          background: "#111",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          MetaUlagam – VR & Film Making Academy
        </h1>

        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          Learn VR Development, AI Storytelling, Filmmaking & 3D Printing from scratch.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Link
            to="/courses"
            style={{
              background: "#ff6600",
              padding: "12px 24px",
              borderRadius: "5px",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Explore Courses
          </Link>

          <Link
            to="/enquiry"
            style={{
              border: "2px solid #ff6600",
              padding: "12px 24px",
              borderRadius: "5px",
              color: "#ff6600",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
