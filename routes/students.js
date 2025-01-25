const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const verifyToken = require('../middleware/verifyToken');

// View profile details
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).populate('profile');
    res.send(student);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching profile' });
  }
});

// Update profile details
router.patch('/profile', verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).populate({ path: 'profile' });
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    if (!student.profile) {
      return res.status(404).send({ message: 'Profile not found' });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ['dateOfBirth', 'gender', 'email', 'nationality', 'phoneNumber', 'address', 'profilePhoto'];
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      return res.status(400).send({ message: 'Invalid update' });
    }
    updates.forEach(update => student.profile[update] = req.body[update]);
    await student.profile.save();
    res.send(student.profile);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating profile' });
  }
});

// View medical details
router.get('/medical-details', verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).populate('medicalDetails');
    res.send(student);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching medical details' });
  }
});

// Update medical details
router.patch('/medical-details', verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).populate({ path: 'medicalDetails' });
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    if (!student.medicalDetails) {
      return res.status(404).send({ message: 'Medical details not found' });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ['medicalCondition', 'allergies', 'medications', 'medicalHistory', 'contactDetails'];
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      return res.status(400).send({ message: 'Invalid update' });
    }
    updates.forEach(update => student.medicalDetails[update] = req.body[update]);
    await student.medicalDetails.save();
    res.send(student.medicalDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating medical details' });
  }
});

module.exports = router;

