// controllers/enquiryController.js
const Enquiry = require("../models/Enquiry");
const nodemailer = require("nodemailer");

// Reuse the same Gmail account for sending notifications
// Make sure EMAIL_USER + EMAIL_PASS are set in .env
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // app password
  },
});

/**
 * POST /api/enquiry
 * Body: { name, email, course, message }
 */
async function createEnquiry(req, res) {
  try {
    const { name, email, course, message } = req.body;

    // Basic validation
    if (!name || !email || !course || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1) Save to MongoDB
    const enquiry = new Enquiry({ name, email, course, message });
    const saved = await enquiry.save();

    // 2) Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // where you receive the mail
      subject: `New Enquiry from ${name} - ${course}`,
      text: `
New enquiry received:

Name: ${name}
Email: ${email}
Course: ${course}

Message:
${message}

Submitted at: ${saved.createdAt}
      `.trim(),
    };

    // Send the email (non-blocking feeling for user)
    await transporter.sendMail(mailOptions);

    // 3) Respond to frontend
    res.status(201).json({
      message: "Enquiry saved and email sent successfully",
      enquiry: saved,
    });
  } catch (err) {
    console.error("Error creating enquiry:", err);

    // You can choose: still send success if DB saved but email failed.
    // For now we'll send 500 on any error.
    res
      .status(500)
      .json({ message: "Failed to process enquiry", error: err.message });
  }
}

/**
 * GET /api/enquiry
 * (You can use this like an admin list)
 */
async function getAllEnquiries(req, res) {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
}

module.exports = {
  createEnquiry,
  getAllEnquiries,
};
