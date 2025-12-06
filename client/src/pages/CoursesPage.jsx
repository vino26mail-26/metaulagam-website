// src/pages/CoursesPage.jsx
import { Link } from "react-router-dom";
import "./CoursesPage.css";

const COURSES = [
  {
    id: "vr-film",
    title: "VR Film Making",
    tag: "VR • Story • Unity",
    duration: "3 Months",
    fee: "₹20,000",
    level: "Intermediate",
    highlight: "Plan and pre-visualize VR scenes for projects like Kalapathy.",
    points: [
      "VR pipeline, cameras, scene blocking",
      "Shot design for immersive storytelling",
      "Hands-on Unity VR practice sessions",
    ],
  },
  {
    id: "3d-printing",
    title: "3D Printing Basics",
    tag: "Physical Prototyping",
    duration: "1 Month",
    fee: "₹8,000",
    level: "Beginner",
    highlight: "Turn your ideas into physical prototypes and props.",
    points: [
      "3D printing workflow & slicing",
      "Preparing models for print (Blender basics)",
      "Finishing, painting and presenting prints",
    ],
  },
  {
    id: "ai-film",
    title: "AI Film Making",
    tag: "AI • Storyboards • Tools",
    duration: "2 Months",
    fee: "₹15,000",
    level: "Intermediate",
    highlight: "Use AI for concept art, storyboards and pre-visualization.",
    points: [
      "Prompting for cinematic frames",
      "AI-assisted animatics & previs",
      "Integrating AI into real productions",
    ],
  },
  {
    id: "digital-film",
    title: "Digital Film Making",
    tag: "Cinematic Foundation",
    duration: "12 Months",
    fee: "₹2,50,000",
    level: "Advanced",
    highlight: "Complete visual communication + film grammar for studios.",
    points: [
      "Cinematography, editing, sound basics",
      "Story structure and directing actors",
      "Portfolio short film as final project",
    ],
  },
];

function CoursesPage() {
  return (
    <div className="courses-page">
      {/* TOP BAR (matches SaaS style, simple) */}
      <header className="courses-nav">
        <div className="courses-nav-left">
          <span className="courses-brand">MetaUlagam Academy</span>
          <nav className="courses-nav-links">
            <Link to="/">Home</Link>
            <Link to="/courses" className="active-link">
              Courses
            </Link>
            <Link to="/enquiry">Enquiry</Link>
            <Link to="/admin-login">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="courses-content">
        {/* HERO + DESCRIPTION */}
        <section className="courses-hero">
          <div>
            <p className="courses-kicker">COURSES</p>
            <h1>Choose your track</h1>
            <p className="courses-sub">
              Each course is designed as a real project pipeline – not just random
              tutorials. You&apos;ll ship work you can actually show to studios and
              companies.
            </p>
          </div>
          <div className="courses-hero-pill">
            <span className="dot" />
            Built for VisCom, film & creative students.
          </div>
        </section>

        {/* GRID OF COURSE CARDS */}
        <section className="courses-grid">
          {COURSES.map((course) => (
            <article key={course.id} className="course-card">
              <div className="course-card-header">
                <div>
                  <h2>{course.title}</h2>
                  <p className="course-tag">{course.tag}</p>
                </div>
                <div className="course-meta">
                  <span className="course-duration">{course.duration}</span>
                  <span className="course-level">{course.level}</span>
                </div>
              </div>

              <p className="course-highlight">{course.highlight}</p>

              <ul className="course-points">
                {course.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>

              <div className="course-footer">
                <div className="course-fee">
                  <span className="fee-label">Fee</span>
                  <span className="fee-value">{course.fee}</span>
                </div>

                <div className="course-actions">
                  <button type="button" className="btn-outline-small" disabled>
                    View syllabus (coming soon)
                  </button>
                  <Link
                    to="/enquiry"
                    className="btn-primary-small"
                    state={{ selectedCourse: course.title }}
                  >
                    Enquire for this course
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default CoursesPage;
