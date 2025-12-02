const Enquiry = require("../models/enquiryModel");

// Create enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, course, message } = req.body;

    if (!name || !email || !course || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const enquiry = new Enquiry({ name, email, course, message });
    const saved = await enquiry.save();

    res.status(201).json({ message: "Enquiry saved", data: saved });
  } catch (err) {
    console.error("Error saving enquiry:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all enquiries (optional)
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching enquiries" });
  }
};
