import { Link } from "react-router-dom";
import "./CoursesPage.css";

const COURSES = [
  {
    id: 1,
    title: "Full-Stack MERN Developer",
    level: "Intermediate",
    duration: "12 weeks",
    mode: "Online / Hybrid",
    highlight:
      "End-to-end MERN projects, auth, admin dashboards, and real deployment.",
    tag: "Most Popular",
  },
  {
    id: 2,
    title: "React Frontend Developer",
    level: "Beginner–Friendly",
    duration: "8 weeks",
    mode: "Online",
    highlight:
      "Modern React with hooks, routing, APIs, and clean, responsive UI.",
    tag: "Frontend",
  },
  {
    id: 3,
    title: "Node + Express API Developer",
    level: "Intermediate",
    duration: "6 weeks",
    mode: "Online",
    highlight:
      "REST APIs with JWT auth, MongoDB, best practices, and error handling.",
    tag: "Backend",
  },
  {
    id: 4,
    title: "Portfolio & Deployment",
    level: "All Levels",
    duration: "4 weeks",
    mode: "Online",
    highlight:
      "Ship and showcase your work on Render, Vercel, and GitHub professionally.",
    tag: "Add-On",
  },
];

function CoursesPage() {
  return (
    <div className="courses-root">
      <div className="courses-inner">
        {/* HEADER */}
        <header className="courses-header">
          <div>
            <p className="courses-kicker">COURSES</p>
            <h1 className="courses-title">Learn by building real tools</h1>
            <p className="courses-subtitle">
              Choose a track and we&apos;ll guide you from{" "}
              <span>idea → deployed project</span> with mentor-style feedback.
            </p>
          </div>

          <Link to="/enquiry" className="courses-cta">
            Talk to a Mentor
          </Link>
        </header>

        {/* GRID */}
        <main className="courses-grid">
          {COURSES.map((course) => (
            <article key={course.id} className="course-card">
              <div className="course-card-inner">
                <div className="course-head">
                  <h2>{course.title}</h2>
                  <span className="course-tag">{course.tag}</span>
                </div>

                <p className="course-highlight">{course.highlight}</p>

                <div className="course-meta">
                  <p>
                    <span>Level:</span> {course.level}
                  </p>
                  <p>
                    <span>Duration:</span> {course.duration}
                  </p>
                  <p>
                    <span>Mode:</span> {course.mode}
                  </p>
                </div>
              </div>

              <div className="course-footer">
                <p>Includes project reviews &amp; feedback.</p>
                <Link to="/enquiry" className="course-enquire">
                  Enquire
                </Link>
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}

export default CoursesPage;
