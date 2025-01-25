const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');
const staffRoutes = require('./routes/staffs');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb+srv://chinomsochristian03:ahYZxLh5loYrfgss@cluster0.dmkcl.mongodb.net/sict_records?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/home', (req, res) => {
  res.render('home');
});
app.get('/medical', (req, res) => {
  res.render('medical');
});
app.get('/profile', (req, res) => {
  res.render('profile');
});
app.get('/profile', (req, res) => {
  res.render('profile');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


// const bcrypt = require('bcryptjs');
// const Admin = require('./models/Admin');

// const seedAdmin = async () => {
//   try {
//     const admin = new Admin({
//       username: 'admin',
//       password: bcrypt.hashSync('password123', 10) 
//     });
//     await admin.save();
//     console.log('Admin seeded successfully');
//   } catch (err) {
//     console.error(err);
//   }
// };

// seedAdmin();