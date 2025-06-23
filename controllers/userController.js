const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const SECRET = process.env.JWT_SECRET;

exports.register = (req, res) => {
  const { email, full_name, password, phone_number, location, status, type } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });

    const newUser = {
      email,
      full_name,
      password: hash,
      phone_number,
      location,
      status,
      type,
      created_at: new Date()
    };

    User.createUser(newUser, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists' });
        }

        console.error('MySQL Insert Error:', err);
        return res.status(500).json({ message: 'Error creating user' });
      }

      const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
      res.status(201).json({ message: 'User created', token });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.getUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful' });
    });
  });
};
