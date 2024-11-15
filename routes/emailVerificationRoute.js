const express = require('express');
const router = express.Router();
// const { verifyUserEmail } = require("../middleware/checkEmailIsVerified")
const { verifyEmail, reverifyEmail } = require("../controllers/authController")

// Verify user's email
router.route("/").get(verifyEmail);

router.route("/:id").post(reverifyEmail);

module.exports = router;