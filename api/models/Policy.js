const mongoose = require('mongoose');

const PolicySchema = mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  surName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('policy', PolicySchema);
