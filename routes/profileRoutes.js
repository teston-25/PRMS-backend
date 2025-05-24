const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const protect = require('./../middleware/protect');

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API for accessing and updating user profiles
 */

/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */

/**
 * @swagger
 * /profile/me:
 *   patch:
 *     summary: Update current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

router.get('/me', protect, profileController.getProfile);
router.patch('/me', protect, profileController.updateProfile);

// router.patch(
//   '/:id/photo',
//   protect,
//   upload.single('photo'),
//   profileController.uploadPhoto
// );

module.exports = router;
