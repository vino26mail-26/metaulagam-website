// routes/enquiryRoutes.js
const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
} = require("../controllers/enquiryController");

// POST /api/enquiry
router.post("/", createEnquiry);

// GET /api/enquiry  (optional: admin view)
router.get("/", getAllEnquiries);

module.exports = router;
