// controllers/adminController.js
const Enquiry = require('../models/Enquiry');

// @desc   Get all enquiries (admin only)
// @route  GET /api/admin/enquiries
// @access Private/Admin
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    console.error('Get enquiries error:', error);
    res.status(500).json({ message: 'Server error fetching enquiries' });
  }
};

module.exports = { getAllEnquiries };
