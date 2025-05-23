const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Utility: create token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

// Signup
exports.signup = catchAsync(async (req, res, next) => {
  const { fullName, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return next(new AppError('Email already exists', 400));
  }

  const user = await User.create({ fullName, email, password, role });
  const token = generateToken(user);

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    user: {
      id: user._id,
      fullName: user.fullName,
      role: user.role,
    },
    token,
  });
});

// Signin
exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  const token = generateToken(user);

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    user: {
      id: user._id,
      fullName: user.fullName,
      role: user.role,
    },
    token,
  });
});
