const mongoose = require('mongoose');

const staffMedicalDetailsSchema = new mongoose.Schema({
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  medicalCondition: { type: String },
  allergies: { type: String },
  medications: { type: String },
  medicalHistory: { type: String },
  contactDetails: {
    primaryContact: {
      name: { type: String },
      relationship: { type: String },
      phoneNumber: { type: String },
      email: { type: String }
    },
    secondaryContact: {
      name: { type: String },
      relationship: { type: String },
      phoneNumber: { type: String },
      email: { type: String }
    }
  }
});

const StaffMedicalDetails = mongoose.model('StaffMedicalDetails', staffMedicalDetailsSchema);

module.exports = StaffMedicalDetails;
