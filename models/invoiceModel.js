const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    medicalHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MedicalHistory',
      required: true,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    issuedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'staff',
    },
    services: [
      {
        name: String,
        cost: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invoice', invoiceSchema);
