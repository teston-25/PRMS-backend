const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect);
router.get('/', restrictTo('admin', 'staff'), invoiceController.getInvoices);
router.post('/', restrictTo('doctor'), invoiceController.createInvoice);
router.patch(
  '/:id/pay',
  restrictTo('staff'),
  invoiceController.markInvoiceAsPaid
);

module.exports = router;
