import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-root">
      {/* TOP NAV */}
      <header className="landing-nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-icon">MU</div>
            <div className="nav-logo-text">
              <p className="nav-title">MetaUlagam Academy</p>
              <p className="nav-subtitle">VR • Film • Full-Stack</p>
            </div>
          </div>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/enquiry">Enquiry</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-inner">
          {/* LEFT TEXT */}
          <div className="hero-left">
            <p className="hero-kicker">METAULAGAM ACADEMY</p>

            <h1 className="hero-title">
              Learn VR, Film Making &amp; AI{" "}
              <span>by building real products</span>
            </h1>

            <p className="hero-description">
              You&apos;ll build a full-stack app like this, plan VR scenes for
              Kalapathy, and learn how to ship work that studios and companies
              actually respect.
            </p>

            <div className="hero-actions">
              <Link to="/courses" className="btn-primary">
                Explore Courses
              </Link>
              <Link to="/enquiry" className="btn-outline">
                Talk to Mentor
              </Link>
            </div>

            <p className="hero-meta">
              <span className="hero-dot" />
              Backend: Node + Express (Render) • Frontend: React + Vite (Vercel)
            </p>
          </div>

          {/* RIGHT VISUAL / IMAGE CARD */}
          <div className="hero-right">
            <div className="hero-card">
              <p className="hero-card-label">
                Live Project Preview
                <span className="hero-pill">In Development</span>
              </p>

              <div className="hero-image">
                {/* You can later replace this with a real image */}
                <p>
                  Hero image / VR still goes here.
                  <br />
                  For now this is a placeholder box, but your layout is working.
                </p>
              </div>

              <div className="hero-status-row">
                <span>Full-Stack App Status</span>
                <span className="hero-status">
                  <span className="hero-status-dot" />
                  Deployed
                </span>
              </div>

              <div className="hero-tech-grid">
                <div className="hero-tech-card">
                  <p className="hero-tech-label">Frontend</p>
                  <p className="hero-tech-value">React + Vite</p>
                </div>
                <div className="hero-tech-card">
                  <p className="hero-tech-label">Backend</p>
                  <p className="hero-tech-value">Node + Express</p>
                </div>
                <div className="hero-tech-card">
                  <p className="hero-tech-label">Database</p>
                  <p className="hero-tech-value">MongoDB Atlas</p>
                </div>
              </div>
            </div>
            <div className="hero-card-glow" />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="highlights">
        <div className="highlight-card">
          <h3>VR &amp; Unity Basics</h3>
          <p>
            Move from flat screens to immersive VR spaces. Scenes, cameras,
            interactions – applied to your own ideas.
          </p>
        </div>

        <div className="highlight-card">
          <h3>Film &amp; Story Structure</h3>
          <p>
            Break stories into shots and sequences that work for both cinema and
            VR – aligned with projects like Kalapathy.
          </p>
        </div>

        <div className="highlight-card">
          <h3>Full-Stack Skills</h3>
          <p>
            React, Node, MongoDB, JWT auth, admin dashboards – all tied to a
            real, deployed project you can show.
          </p>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="who-for">
        <div className="who-inner">
          <div className="who-text">
            <h2>Designed for VisCom &amp; creative students</h2>
            <p>
              If you&apos;re a VisCom student, aspiring filmmaker, or a creator
              who loves story + tech, this is structured for you.
            </p>
            <p>
              You&apos;ll combine VR, AI, and full-stack development to create
              work that actually feels like a portfolio, not just assignments.
            </p>
            <Link to="/enquiry" className="who-link">
              Send an enquiry →
            </Link>
          </div>

          <div className="who-card-wrapper">
            <div className="who-card-glow" />
            <div className="who-card">
              <p className="who-card-title">
                After this course, you&apos;ll be able to say:
              </p>
              <ul>
                <li>I built and deployed a full-stack app like this one.</li>
                <li>I understand how VR scenes and film structure work.</li>
                <li>I can collaborate with both dev and creative teams.</li>
                <li>I&apos;m not just watching tutorials – I shipped real work.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
