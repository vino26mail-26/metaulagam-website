// models/Enquiry.js
const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name:   { type: String, required: true },
    email:  { type: String, required: true },
    course: { type: String, required: true },
    message:{ type: String, required: true },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
