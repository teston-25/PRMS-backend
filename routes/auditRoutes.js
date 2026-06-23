const express = require('express');
const router = express.Router();
const catchAsync = require('../middleware/catchAsync');
const AuditLog = require('../models/auditLogModel');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect, restrictTo('admin'));

router.get(
  '/',
  catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const logsPromise = AuditLog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'fullName email');

    const totalLogsPromise = AuditLog.countDocuments();

    const [logs, totalLogs] = await Promise.all([
      logsPromise,
      totalLogsPromise,
    ]);

    const totalPages = Math.ceil(totalLogs / limit);

    res.status(200).json({
      status: 'success',
      pagination: {
        totalLogs,
        totalPages,
        currentPage: page,
        limit,
      },
      data: logs,
    });
  }),
);

module.exports = router;
