const mongoose = require('mongoose');
const validator = require('validator');

const appointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
      validate: {
        validator: function (date) {
          // Get current date (without time)
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          // Get appointment date (without time)
          const appointmentDate = new Date(date);
          appointmentDate.setHours(0, 0, 0, 0);

          return appointmentDate >= today;
        },
        message: 'Appointment date cannot be in the past',
      },
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
  },
);

appointmentSchema.index({ date: 1 });
appointmentSchema.index({ assignedTo: 1 });
appointmentSchema.index({ patient: 1 });
appointmentSchema.index({ assignedTo: 1, date: 1 }); // compound for getMyAppointments + date filter

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
