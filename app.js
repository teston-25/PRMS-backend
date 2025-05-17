const express = require('express');
const morgan = require('morgan');

const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/patient', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

module.exports = app;
