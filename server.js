const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');
const port = process.env.PORT || 5000;

dotenv.config({ path: './config.env' });
const db = process.env.DATABASE_LOCAL;
// const db = process.env.DATABASE.replace(
// '<PASSWORD>',
// process.env.DATABASE_PASSWORD
// );

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
