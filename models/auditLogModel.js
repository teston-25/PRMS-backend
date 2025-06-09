const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: String,
  user: {
    id: mongoose.Schema.Types.ObjectId,
    role: String,
  },
  target: {
    type: String,
    id: mongoose.Schema.Types.ObjectId,
  },
  details: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
