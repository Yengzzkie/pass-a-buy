const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, createUser, findUserByName } = require('../controllers/userController');

// Get all users / Create new user
router.route("/").get(getAllUsers).post(createUser);

// Search user by ID
router.route("/search").get(findUserByName);

// Get user by ID
router.route("/:userId").get(getUser);


module.exports = router;
