const mongoose = require('mongoose');

const studentMedicalDetailsSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
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

const StudentMedicalDetails = mongoose.model('StudentMedicalDetails', studentMedicalDetailsSchema);

module.exports = StudentMedicalDetails;
