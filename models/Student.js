
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  regNo: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  medicalDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentMedicalDetails' }


});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
