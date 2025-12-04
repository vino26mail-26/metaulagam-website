// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// =======================
// Route imports
// =======================
const courseRoutes = require('./routes/courseRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const authRoutes = require('./routes/authRoutes');     // ✅ Auth (signup/login)
const adminRoutes = require('./routes/adminRoutes');   // ✅ Protected admin

const app = express();

// =======================
// Config
// =======================
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/metaulagam';

// =======================
// MongoDB Connection
// =======================
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// =======================
// Global Middleware
// =======================
app.use(cors());
app.use(express.json());

// Simple logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/ping', (req, res) => {
  res.send('Backend alive');
});

// Root route (optional)
app.get('/', (req, res) => {
  res.send('MetaUlagam API is running');
});

// =======================
// Routes
// =======================

// DB course APIs
// GET /api/db/courses
// POST /api/db/courses
// PUT /api/db/courses/:id
// DELETE /api/db/courses/:id
app.use('/api/db/courses', courseRoutes);

// Enquiry APIs
// POST /api/enquiry
// GET  /api/enquiry
app.use('/api/enquiry', enquiryRoutes);

// Auth APIs
// POST /api/auth/signup
// POST /api/auth/login
app.use('/api/auth', authRoutes);

// Admin APIs (protected by JWT middleware)
// GET /api/admin/enquiries
app.use('/api/admin', adminRoutes);

// =======================
// 404 handler (optional)
// =======================
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// =======================
// Start server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
