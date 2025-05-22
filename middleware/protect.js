const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../utils/appError');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists.', 401)
      );
    }

    // Grant access
    req.user = currentUser; // attach user object (or just id if you prefer)
    next();
  } catch (err) {
    return next(new AppError('Invalid token. Please log in again!', 401));
  }
};

module.exports = protect;
