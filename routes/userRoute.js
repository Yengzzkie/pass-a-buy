const express = require('express');
const router = express.Router();
const { getUsernames, createUsernamePost } = require('../controllers/userController');

// Get all users / Create new user
router.route("/").get(getUsernames).post(createUsernamePost);


module.exports = router;
