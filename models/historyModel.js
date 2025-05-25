const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('History', historySchema);
