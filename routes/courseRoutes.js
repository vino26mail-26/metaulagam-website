// routes/courseRoutes.js
const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// ORDER is important: more specific routes first if you add extra ones later

// GET all courses  →  GET /api/db/courses
router.get("/", getAllCourses);

// GET one course  →  GET /api/db/courses/:id
router.get("/:id", getCourseById);

// CREATE course  →  POST /api/db/courses
router.post("/", createCourse);

// UPDATE course  →  PUT /api/db/courses/:id
router.put("/:id", updateCourse);

// DELETE course  →  DELETE /api/db/courses/:id
router.delete("/:id", deleteCourse);

module.exports = router;
