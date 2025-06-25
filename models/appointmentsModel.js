const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
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
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Doctor is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
