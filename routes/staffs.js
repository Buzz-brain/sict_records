const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const verifyToken = require('../middleware/verifyToken');

// View staff profile
router.get('/staff-profile', verifyToken, async (req, res) => {
  try {
    const staff = await Staff.findById(req.user._id).populate('staffProfile');
    res.send(staff);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching staff profile' });
  }
});

// Update staff profile
router.patch('/staff-profile', verifyToken, async (req, res) => {
  try {
    const staff = await Staff.findById(req.user._id).populate({ path: 'staffProfile' });
    if (!staff) {
      return res.status(404).send({ message: 'Staff not found' });
    }
    if (!staff.staffProfile) {
      return res.status(404).send({ message: 'Profile not found' });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ['dateOfBirth', 'gender', 'email', 'nationality', 'phoneNumber', 'address', 'profilePhoto', 'profession', 'degree'];
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      return res.status(400).send({ message: 'Invalid update' });
    }
    updates.forEach(update => staff.staffProfile[update] = req.body[update]);
    await staff.staffProfile.save();
    res.send(staff.staffProfile);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating staff profile' });
  }
});


// View staff medical details
router.get('/staff-medical-details', verifyToken, async (req, res) => {
  try {
    const staff = await Staff.findById(req.user._id).populate('staffMedicalDetails');
    res.send(staff);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching staff medical details' });
  }
});

// Update staff medical details
router.patch('/staff-medical-details', verifyToken, async (req, res) => {
  try {
    const staff = await Staff.findById(req.user._id).populate('staffMedicalDetails');
    if (!staff) {
      return res.status(404).send({ message: 'Staff not found' });
    }
    if (!staff.staffMedicalDetails) {
      return res.status(404).send({ message: 'Medical details not found' });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ['medicalCondition', 'allergies', 'medications', 'medicalHistory', 'contactDetails'];
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      return res.status(400).send({ message: 'Invalid update' });
    }
    updates.forEach(update => staff.staffMedicalDetails[update] = req.body[update]);
    await staff.staffMedicalDetails.save();
    res.send(staff.staffMedicalDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating staff medical details' });
  }
});

module.exports = router;

