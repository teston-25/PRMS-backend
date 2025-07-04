<<<<<<< HEAD
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

dotenv.config({ path: './config.env' });
const db = process.env.DATABASE_LOCAL;
// const db = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// Allow requests from your frontend domain
app.use(
  cors({
    origin: '*', // <-- change to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

mongoose
  .connect(db)
  .then(() => {
    console.log('✅Database Connected successfully...');
  })
  .catch((err) => {
    console.log('❌Connection Failed to the database');
  });
app.listen(port, () => {
  console.log(`server listening in port ${port}`);
});
=======
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');
const port = process.env.PORT || 5000;

dotenv.config({ path: './config.env' });
// const db = process.env.DATABASE_LOCAL;
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db)
  .then(() => {
    console.log('✅Database Connected successfully...');
  })
  .catch((err) => {
    console.log('❌Connection Failed to the database');
  });
app.listen(port, () => {
  console.log(`server listening in port ${port}`);
});
>>>>>>> ef97297fe3fdd093badf1b1a8be97af4aed8b725
