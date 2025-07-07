const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      validate: [validator.isAlpha, 'Firstname has to be character only'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      validate: [validator.isAlpha, 'Lastname has to be character only'],
    },
    dob: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['male', 'female', 'other'],
        message: 'Gender has to be either: male , female or other',
      },
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
    },
    address: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

patientSchema.virtual('age').get(function () {
  if (!this.dob) return null;
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

patientSchema.virtual('appointments', {
  ref: 'Appointment',
  foreignField: 'patient',
  localField: '_id',
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
