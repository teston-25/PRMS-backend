const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 500,
  message: 'Too many requests. Please try again later.',
});

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 500,
  message: 'Too many login attempts. Try again in an hour.',
});

module.exports = {
  apiLimiter,
  loginLimiter,
};
