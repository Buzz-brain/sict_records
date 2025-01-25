const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "hello"

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error logging in' });
  }
});


// Student Login
router.post('/student/login', async (req, res) => {
  try {
    const { regNo, password } = req.body;
    const student = await Student.findOne({ regNo });
    if (!student) {
      return res.status(401).send({ message: 'Invalid regNo or password' });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid regNo or password' });
    }
    const token = jwt.sign({ id: student._id }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error logging in' });
  }
});

// Staff Login
router.post('/staff/login', async (req, res) => {
  try {
    const { staffId, password } = req.body;
    const staff = await Staff.findOne({ staffId });
    if (!staff) {
      return res.status(401).send({ message: 'Invalid staffId or password' });
    }
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid staffId or password' });
    }
    const token = jwt.sign({ id: staff._id }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error logging in' });
  }
});

module.exports = router;
