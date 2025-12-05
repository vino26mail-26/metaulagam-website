const Enquiry = require("../models/Enquiry");

// POST /api/enquiries  → save enquiry to DB
exports.createEnquiry = async (req, res) => {
  try {
    console.log("📩 Enquiry POST body:", req.body);

    const { name, email, phone, course, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email & message are required" });
    }

    const enquiry = new Enquiry({ name, email, phone, course, message });
    const saved = await enquiry.save();

    console.log("✅ Enquiry saved:", saved);
    return res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving enquiry:", err);
    return res.status(500).json({ error: "Failed to save enquiry" });
  }
};

// GET /api/enquiries  → list all enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const list = await Enquiry.find().sort({ createdAt: -1 });
    return res.json(list);
  } catch (err) {
    console.error("❌ Error fetching enquiries:", err);
    return res.status(500).json({ error: "Failed to fetch enquiries" });
  }
};
