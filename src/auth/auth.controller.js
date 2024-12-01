const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with plain text password
    user = new User({
      name,
      email,
      password, // Storing password as plain text (NOT RECOMMENDED for production)
      role
    });

    await user.save();

    // Create and sign the toke
    res.status(201).json({success:'true', role: user.role });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password (plain text comparison)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign the token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'secretKey',
      { expiresIn: '1h' }
    );

    console.log('Generated token:', token); // For debugging
    res.json({ success: 'true', token, result: user});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

