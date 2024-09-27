const express = require('express');
const router = express.Router();
const { getAllUsers, createUsernamePost } = require('../controllers/userController');

// Get all users / Create new user
router.route("/").get(getAllUsers).post(createUsernamePost);


module.exports = router;
