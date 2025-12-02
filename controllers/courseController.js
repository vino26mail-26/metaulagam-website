// controllers/courseController.js
const mongoose = require("mongoose");
const Course = require("../models/Course");

// ✅ Simple validation logic reused by POST + PUT
function validateCourseBody(body) {
  const { title, duration, fee } = body;

  if (!title || !duration || fee == null) {
    return "title, duration, fee are required";
  }

  if (typeof fee !== "number") {
    return "fee must be a number";
  }

  return null; // no error
}

// ✅ GET /api/db/courses  (all)
async function getAllCourses(req, res) {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
}

// ✅ GET /api/db/courses/:id  (single)
async function getCourseById(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid course ID format" });
  }

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ message: "Failed to fetch course" });
  }
}

// ✅ POST /api/db/courses  (create)
async function createCourse(req, res) {
  const error = validateCourseBody(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const { title, duration, fee } = req.body;
    const course = new Course({ title, duration, fee });
    const saved = await course.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving course:", err);
    res.status(500).json({ message: "Failed to save course" });
  }
}

// ✅ PUT /api/db/courses/:id  (update)
async function updateCourse(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid course ID format" });
  }

  const error = validateCourseBody(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const updated = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ message: "Failed to update course" });
  }
}

// ✅ DELETE /api/db/courses/:id  (delete)
async function deleteCourse(req, res) {
  const { id } = req.params;

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
    res.status(500).json({ message: "Failed to delete course" });
  }
}

// Optional extra features (filter, pagination, sort)
// already working earlier; you can add back later if needed.

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
