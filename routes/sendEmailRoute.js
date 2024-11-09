const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const { sendVerificationMail } = require('../controllers/sendEmailController');

// send email route
router.route('/').post(verifyToken, sendVerificationMail);

module.exports = router;