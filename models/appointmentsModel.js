const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: Number,
      required: [true, 'Appointment ID is required'],
      unique: true,
      default: (Math.random() * 1000).toFixed(0),
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    doctor: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    reason: {
      type: String,
      trim: true,
      default: 'General consultation',
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient reference is required'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
