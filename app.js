const express = require('express');
const morgan = require('morgan');

const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

module.exports = app;
