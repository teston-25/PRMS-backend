const express = require('express');
const router = express.Router();
const AuditLog = require('../models/auditLogModel');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect, restrictTo('admin'));

router.get('/', async (req, res) => {
  const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);

  res.status(200).json({
    status: 'success',
    results: logs.length,
    data: logs,
  });
});

module.exports = router;
