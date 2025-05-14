const express = require('express');
const router = express.Router();

router.route('/').get().post();
router.get('/patient/:id');
router.delete('/:id');

module.exports = router;
