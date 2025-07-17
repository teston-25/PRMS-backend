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
      validate: {
        validator: function (dob) {
          // Calculate the minimum date (7 years ago from now)
          const minDate = new Date();
          minDate.setFullYear(minDate.getFullYear() - 7);

          // Calculate the maximum reasonable date (e.g., 120 years ago)
          const maxDate = new Date();
          maxDate.setFullYear(maxDate.getFullYear() - 120);

          // Date must be before minDate (at least 5 years old) and after maxDate
          return dob <= minDate && dob >= maxDate;
        },
        message:
          'Patient must be at least 7 years old and date must be reasonable',
      },
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
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phone: {
      type: Number,
      required: [true, 'Phone number is required'],
      unique: true,
      validate: {
        validator: function (v) {
          // Check if positive number and exactly 10 digits
          return v > 0 && v.toString().length === 10;
        },
        message: (props) =>
          `${props.value} is not valid! Phone must be a positive 9-digit number.`,
      },
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
