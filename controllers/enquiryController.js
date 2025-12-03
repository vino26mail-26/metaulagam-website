const Enquiry = require("../models/Enquiry");

exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, course, message } = req.body;

    if (!name || !email || !course || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const enquiry = new Enquiry({ name, email, course, message });
    const saved = await enquiry.save();   // write to Atlas

    console.log("📩 New enquiry saved:", saved);

    // send back BOTH a message and the saved doc
    res.status(201).json({
      message: "Enquiry received",
      enquiry: saved,
    });
  } catch (err) {
    console.error("❌ Error saving enquiry:", err);
    res.status(500).json({ message: "Failed to save enquiry" });
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const list = await Enquiry.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error("❌ Error fetching enquiries:", err);
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};
