// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const { getAllEnquiries } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// ✅ FINAL ROUTE PATH:
// Mounted at: /api/admin  (in server.js)
// Full URL:   /api/admin/enquiries
router.get('/enquiries', protect, adminOnly, getAllEnquiries);

module.exports = router;
