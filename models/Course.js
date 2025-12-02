// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
  fee: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
