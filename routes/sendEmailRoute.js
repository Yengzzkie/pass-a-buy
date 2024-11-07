const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const { sendMail } = require('../controllers/sendEmailController');

// send email route
router.route('/').post(verifyToken, sendMail);

module.exports = router;