// server.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const courseRoutes = require("./routes/courseRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");

const app = express();

// Read config
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/metaulagam";

// =======================
// MongoDB Connection
// =======================
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/ping", (req, res) => {
  res.send("Backend alive");
});

// =======================
// Routes
// =======================

// DB course APIs:
// GET /api/db/courses
// POST /api/db/courses
// PUT /api/db/courses/:id
// DELETE /api/db/courses/:id
app.use("/api/db/courses", courseRoutes);

// Enquiry APIs:
// POST /api/enquiry
// GET  /api/enquiry
app.use("/api/enquiry", enquiryRoutes);

// =======================
// Start server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
