const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/userController');

// Get all users / Create new user
router.route("/").get(getAllUsers).post(createUser);


module.exports = router;
