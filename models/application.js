const mongoose = require('mongoose')

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
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: false,
  },
  unhoused: {
    type: Boolean,
    required: false,
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
    required: false,
  },
  question2: {
    type: String,
    required: false,
  },
  question3: {
    type: String,
    required: true,
  }

})

// Create a Mongoose model for the application data
const Application = mongoose.model('Application', applicationSchema)

module.exports = Application