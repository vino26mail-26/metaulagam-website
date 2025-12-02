// server.js
require("dotenv").config();          // Load .env first


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// Routes
const courseRoutes = require("./routes/courseRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");


const app = express();

// Read from .env (with defaults)
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/metaulagam";

// =======================
// MongoDB Connection
// =======================
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =======================
// Middleware
// =======================

// Allow other origins (like Live Server :5500) to call API
app.use(cors());

// Parse JSON body
app.use(express.json());

// Simple logger
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

// All DB course APIs here:
// GET    /api/db/courses
// POST   /api/db/courses
// PUT    /api/db/courses/:id
// DELETE /api/db/courses/:id
app.use("/api/db/courses", courseRoutes);
app.use("/api/enquiries", enquiryRoutes);


// =======================
// Start server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
