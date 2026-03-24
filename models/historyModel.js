const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    diagnosis: String,
    treatment: String,
    medications: [String],
    date: {
      type: Date,
      default: Date.now,
    },
    billingStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

historySchema.index({ patient: 1 });

module.exports = mongoose.model('History', historySchema);
