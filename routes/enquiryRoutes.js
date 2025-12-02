// routes/enquiryRoutes.js
const express = require("express");
const Enquiry = require("../models/enquiryModel");

const router = express.Router();

// POST /api/enquiries  → save new enquiry
router.post("/", async (req, res) => {
  const { name, email, course, message } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ message: "Name, email and course are required" });
  }

  try {
    const enquiry = new Enquiry({ name, email, course, message });
    const saved = await enquiry.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving enquiry:", err);
    res.status(500).json({ message: "Error saving enquiry" });
  }
});

module.exports = router;
