const express = require('express');
const router = express.Router();
const auth = require('../Controller/authController');
const { requireAuth } = require('../middlewares/authMiddleware');

router.post('/signup', auth.signup);          // Create admin
router.post('/login', auth.login);            // Login admin
router.post('/reset-password', requireAuth, auth.resetPassword); // Simple reset

module.exports = router;
