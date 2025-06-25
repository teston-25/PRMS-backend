const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentsController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect);

router
  .route('/')
  .get(restrictTo('admin', 'staff'), appointmentController.getAppointments)
  .post(restrictTo('admin', 'staff'), appointmentController.addAppointment);

router
  .route('/today')
  .get(
    restrictTo('admin', 'staff'),
    appointmentController.getTodayAppointments
  );

router
  .route('/by-date')
  .get(
    restrictTo('admin', 'staff'),
    appointmentController.getAppointmentsByDate
  );

router
  .route('/:id')
  .patch(restrictTo('admin', 'staff'), appointmentController.updateAppointment)
  .delete(
    restrictTo('admin', 'staff'),
    appointmentController.deleteAppointment
  );

router
  .route('/my-appointments')
  .get(restrictTo('doctor', 'staff'), appointmentController.getMyAppointments);

router
  .route('/today/my')
  .get(
    restrictTo('doctor', 'staff'),
    appointmentController.getTodayMyAppointments
  );

router
  .route('/:id/status')
  .patch(
    restrictTo('doctor', 'staff'),
    appointmentController.updateAppointmentStatus
  );

router.get(
  '/patient/:id',
  restrictTo('admin', 'staff', 'user'),
  appointmentController.getAppointmentsByPatient
);

module.exports = router;
