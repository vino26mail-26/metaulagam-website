// routes/enquiryRoutes.js
const express = require("express");
const router = express.Router();

const {
  createEnquiry,
  getEnquiries,
} = require("../controllers/enquiryController");

// POST /api/enquiry  → save enquiry
router.post("/", createEnquiry);

// GET /api/enquiry   → list all (for admin tools)
router.get("/", getEnquiries);

module.exports = router;
