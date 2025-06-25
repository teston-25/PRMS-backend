const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: String,
  user: {
    id: mongoose.Schema.Types.ObjectId,
    role: String,
  },
  target: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'target.type',
    },
  },
  details: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
