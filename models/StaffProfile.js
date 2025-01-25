const mongoose = require('mongoose');

const staffProfileSchema = new mongoose.Schema({
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String
  },
  email: {
    type: String
  },
  nationality: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  },
  profilePhoto: {
    type: String
  },
  profession: {
    type: String
  },
  degree: {
    type: String
  }
});

const StaffProfile = mongoose.model('StaffProfile', staffProfileSchema);

module.exports = StaffProfile;
