const AuditLog = require('../models/auditLogModel');

module.exports = async function logAction({
  req,
  action,
  targetType,
  targetId,
  details = {},
  actor = null,
}) {
  const userInfo = actor
    ? { id: actor._id, role: actor.role }
    : req.user
    ? { id: req.user._id, role: req.user.role }
    : { id: null, role: 'system' };

  await AuditLog.create({
    action,
    user: userInfo,
    target: { type: targetType, id: targetId },
    details,
  });
};
