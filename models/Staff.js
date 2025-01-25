
const mongoose = require('mongoose');


const staffSchema = new mongoose.Schema({
  staffId: {
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
  staffProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StaffProfile'
  },
  staffMedicalDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffMedicalDetails' }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;