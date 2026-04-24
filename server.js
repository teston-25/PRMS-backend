const dotenv = require('dotenv');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

dotenv.config({ path: './config.env' });
const app = require('./app');

const required = [
  'DATABASE',
  'DATABASE_PASSWORD',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
];
const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`❌ Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const db =
  process.env.DATABASE_LOCAL ||
  process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(db)
  .then(() => {
    console.log('✅ Database Connected successfully...');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Connection Failed to the database', err.message);
    process.exit(1);
  });

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err.message);
  process.exit(1);
});
