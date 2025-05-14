const dotenv = require('dotenv');
const app = require('./app');
const port = process.env.PORT || 5000;

dotenv.config({ path: './.env' });

app.listen(port, () => {
  console.log('Server running..');
});
