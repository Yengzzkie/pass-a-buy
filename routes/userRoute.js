const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, createUser, findUserByName, findUserByEmail, findUserByContact, changeUserPassword } = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken')
const { authenticateUser } = require('../controllers/authController');

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
// User has to be logged in to be able to view other user's profile
router.route("/:userId").get(verifyToken, getUser).put(verifyToken, changeUserPassword);


module.exports = router;
