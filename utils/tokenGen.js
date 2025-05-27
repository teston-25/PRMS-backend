const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'super_super_secret_key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

module.exports = generateToken;
