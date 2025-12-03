// controllers/enquiryController.js
const Enquiry = require("../models/Enquiry");

// POST /api/enquiry  → save enquiry to DB
exports.createEnquiry = async (req, res) => {
  try {
    console.log("📩 Enquiry POST body:", req.body);

    const { name, email, course, message } = req.body;

    if (!name || !email || !course || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const enquiry = new Enquiry({ name, email, course, message });
    const saved = await enquiry.save();

    console.log("✅ Enquiry saved:", saved);

    // ⬇⬇⬇ NO "message": "Enquiry received" here ⬇⬇⬇
    return res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving enquiry:", err);
    return res.status(500).json({ error: "Failed to save enquiry" });
  }
};

// GET /api/enquiry  → list all enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const list = await Enquiry.find().sort({ createdAt: -1 });
    return res.json(list);
  } catch (err) {
    console.error("❌ Error fetching enquiries:", err);
    return res.status(500).json({ error: "Failed to fetch enquiries" });
  }
};
