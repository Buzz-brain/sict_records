const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Profile = require('../models/Profile');
const Staff = require('../models/Staff');
const StaffProfile = require('../models/StaffProfile');
const StudentMedicalDetails = require('../models/StudentMedicalDetails');
const StaffMedicalDetails = require('../models/StaffMedicalDetails');
const bcrypt = require('bcryptjs');

// Preregister a student
router.post('/preregister', async (req, res) => {
  try {
    const { name, regNo, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ name, regNo, password: hashedPassword });
    await student.save();
    const profile = new Profile({ student: student._id });
    await profile.save();
    student.profile = profile._id; // Update the profile field in the Student document
    await student.save();
    const medicalDetails = new StudentMedicalDetails({ student: student._id });
    await medicalDetails.save();
    student.medicalDetails = medicalDetails._id; // Update the medicalDetails field in the Student document
    await student.save();
    res.send({ message: 'Student preregistered successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error preregistering student' });
  }
});


// Preregister a staff
router.post('/preregister/staff', async (req, res) => {
  try {
    const { name, staffId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const staff = new Staff({ name, staffId, password: hashedPassword });
    await staff.save();
    const profile = new StaffProfile({ staff: staff._id });
    await profile.save();
    staff.staffProfile = profile._id; // Update the profile field in the Staff document
    await staff.save();
    const medicalDetails = new StaffMedicalDetails({ staff: staff._id });
    await medicalDetails.save();
    staff.staffMedicalDetails = medicalDetails._id; // Update the medicalDetails field in the Staff document
    await staff.save();
    res.send({ message: 'Staff preregistered successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error preregistering staff' });
  }
});


// View all students' details
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find().populate('profile').populate('medicalDetails');
    res.send(students);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching students' });
  }
});

// View all staff details
router.get('/staffs', async (req, res) => {
  try {
    const staff = await Staff.find().populate('staffProfile').populate('staffMedicalDetails');
    res.send(staff);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching staff' });
  }
});

module.exports = router;

