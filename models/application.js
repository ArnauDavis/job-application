const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  unhoused: {
    type: Boolean,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  workExperience: [{
    company: String,
    startDate: Date,
    endDate: Date,
  }],
  references: [{
    name: String,
    relationship: String,
    phone: String,
  }],
  question1: {
    type: String,
    required: true,
  },
  question2: {
    type: String,
    required: true,
  }
});

// Create a Mongoose model for the application data
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application