// controllers/enquiryController.js
const Enquiry = require("../models/Enquiry");

async function createEnquiry(req, res) {
  try {
    const { name, email, course, message } = req.body;

    // Basic validation
    if (!name || !email || !course || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1) Save in MongoDB
    const saved = await Enquiry.create({ name, email, course, message });

    console.log("📩 New enquiry SAVED to DB:", saved);

    // 2) Respond to frontend
    return res.status(201).json({ message: "Enquiry received" });
  } catch (err) {
    console.error("❌ Error saving enquiry:", err);
    return res.status(500).json({ message: "Failed to save enquiry" });
  }
}

// Optional: list all enquiries (for admin view)
async function getEnquiries(req, res) {
  try {
    const all = await Enquiry.find().sort({ createdAt: -1 });
    return res.json(all);
  } catch (err) {
    console.error("❌ Error fetching enquiries:", err);
    return res.status(500).json({ message: "Failed to fetch enquiries" });
  }
}

module.exports = { createEnquiry, getEnquiries };
