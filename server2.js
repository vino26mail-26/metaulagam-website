const express = require("express");
const app = express();

const courses = [
  { id: 1, title: "VR Film Making", duration: "3 Months", fee: 20000 },
  { id: 2, title: "3D Printing Basics", duration: "1 Month", fee: 8000 },
  { id: 3, title: "AI Filmmaking", duration: "2 Months", fee: 15000 }
];

// ALL COURSES
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// SINGLE COURSE BY ID
app.get("/api/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id, 10);

  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(course);
});

app.listen(3000, () => {
  console.log("Server2 running at http://localhost:3000");
  console.log("Try: /api/courses and /api/courses/1");
});
