import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    const res = await fetch(`${API_BASE_URL}/api/db/courses`);
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div>
      <h2>Our Courses</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {courses.map((course) => (
          <div
            key={course._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              width: "250px",
            }}
          >
            <h3>{course.title}</h3>

            <p>{course.description}</p>

            <Link
              to={`/enquiry?course=${encodeURIComponent(course.title)}`}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Enquire Now →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
