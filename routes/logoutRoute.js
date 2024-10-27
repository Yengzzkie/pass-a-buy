const express = require('express');
const router = express.Router();
const { logoutUser } = require('../controllers/authController');

router.route("/").post(logoutUser);

module.exports = router;