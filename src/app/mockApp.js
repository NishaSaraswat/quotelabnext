const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Mock login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email !== 'existinguser@example.com') {
    return res.status(400).json({ message: "User doesn't exist with that email" });
  }
  if (password !== 'password123') {
    return res.status(400).json({ message: 'Email or password is invalid' });
  }
  res.json({ token: 'fake-jwt-token' });
});

// Mock signup route
app.post('/signup', (req, res) => {
  const { email } = req.body;
  if (email === 'existinguser@example.com') {
    return res.status(400).json({ message: 'User already exists with that email' });
  }
  res.status(201).json({ message: 'User created successfully' });
});

module.exports = app;
