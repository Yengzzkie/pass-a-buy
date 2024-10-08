const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, createUser, findUserByName, findUserByEmail, findUserByContact, changeUserPassword } = require('../controllers/userController');

// Get all users / Create new user
router.route("/").get(getAllUsers);

// Register user
router.route("/register").post(createUser);

// Search user by name
router.route("/search/name").get(findUserByName);

// Search user by email
router.route("/search/email").get(findUserByEmail);

// Search user by number
router.route("/search/contact").get(findUserByContact);

// Get user by ID
router.route("/:userId").get(getUser).put(changeUserPassword);


module.exports = router;
