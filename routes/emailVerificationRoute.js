const express = require('express');
const router = express.Router();
// const { verifyUserEmail } = require("../middleware/checkEmailIsVerified")
const { verifyEmail } = require("../controllers/authController")

// Verify user's email
router.route("/").get(verifyEmail);

module.exports = router;