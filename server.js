const express = require("express");
const mongoose = require("mongoose");   // ⬅ NEW
const app = express();

// MongoDB connection
mongoose
 .connect("mongodb://127.0.0.1:27017/metaulagam")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

  // Mongoose Course schema + model
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  fee: { type: Number, required: true },
});

const Course = mongoose.model("Course", courseSchema);

// 1) Allow JSON body parsing
app.use(express.json());

// 2) Simple logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 3) In-memory "database"
const courses = [
  { id: 1, title: "VR Film Making", duration: "3 Months", fee: 20000 },
  { id: 2, title: "3D Printing Basics", duration: "1 Month", fee: 8000 },
  { id: 3, title: "AI Filmmaking", duration: "2 Months", fee: 15000 },
];

// 4) Validation middleware for POST/PUT
function validateCourse(req, res, next) {
  const { title, duration, fee } = req.body;

  if (!title || !duration || !fee) {
    return res.status(400).json({ message: "All fields are required" });
  }

  next();
}

// 5) GET: all courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// 6) GET: single course by id
app.get("/api/courses/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(course);
});

// 7) POST: create new course
app.post("/api/courses", validateCourse, (req, res) => {
  const { title, duration, fee } = req.body;

  const newCourse = {
    id: courses.length + 1,
    title,
    duration,
    fee,
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// 8) PUT: update existing course
app.put("/api/courses/:id", validateCourse, (req, res) => {
  const id = parseInt(req.params.id, 10);

  let course = courses.find((c) => c.id === id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  course.title = req.body.title;
  course.duration = req.body.duration;
  course.fee = req.body.fee;

  res.json({ message: "Course updated", course });
});

// 9) DELETE: remove course
app.delete("/api/courses/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = courses.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  courses.splice(index, 1);
  res.json({ message: "Course deleted" });
});

// ===============================
// DB-BASED COURSES (MongoDB)
// ===============================

// GET all courses from MongoDB
app.get("/api/db/courses", async (req, res) => {
  try {
    const dbCourses = await Course.find();
    res.json(dbCourses);
  } catch (err) {
    console.error("Error fetching courses from DB:", err);
    res.status(500).json({ message: "Error fetching courses from DB" });
  }
});

// POST: add new course into MongoDB
app.post("/api/db/courses", async (req, res) => {
  const { title, duration, fee } = req.body;

  if (!title || !duration || !fee) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const course = new Course({ title, duration, fee });
    const saved = await course.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving course:", err);
    res.status(500).json({ message: "Error saving course" });
  }
});

// UPDATE course in MongoDB
app.put("/api/db/courses/:id", async (req, res) => {
  const { id } = req.params;

  // 1) validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid course ID format" });
  }

  try {
    const updated = await Course.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // return updated doc + run schema validation
    );

    if (!updated) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// DELETE course from MongoDB
app.delete("/api/db/courses/:id", async (req, res) => {
  const { id } = req.params;

  // 1) validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid course ID format" });
  }

  try {
    const deleted = await Course.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

app.get("/ping", (req, res) => {
  res.send("Backend alive");
});



// 10) Start server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
  console.log("➡ GET    /api/courses");
  console.log("➡ GET    /api/courses/1");
  console.log("➡ POST   /api/courses");
  console.log("➡ PUT    /api/courses/1");
  console.log("➡ DELETE /api/courses/1");
});
