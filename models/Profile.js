const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
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
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
