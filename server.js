require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const courseRoutes = require("./routes/courseRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/metaulagam";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("Backend alive");
});

// ✉️ Enquiry endpoint (for your form)
app.post("/api/enquiry", (req, res) => {
  console.log("📩 New enquiry received:", req.body);

  // Later we can save to MongoDB or send email.
  // For now, just confirm it worked:
  res.status(201).json({ message: "Enquiry received" });
});

// IMPORTANT: THIS MUST BE CORRECT
app.use("/api/db/courses", courseRoutes);
app.use("/api/enquiry", enquiryRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
