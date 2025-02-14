const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({
      name,
      email,
      password,
      role
    });

    const response = await user.save();
    res.status(201).json({success:'true', response, message: "User Registered successfully"});
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'secretKey',
      { expiresIn: '1h' }
    );

    res.json({ success: 'true', token, result: user});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async(req,res) => {
  const users = await User.find();
  res.status(200).json({
    success: 'true',
    users,
    message: "Users retrieved successfully."
  })
};