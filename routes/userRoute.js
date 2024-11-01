const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, createUser, findUserByName, findUserByEmail, findUserByContact, changeUserPassword } = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');

// Get all users / Create new user
router.route("/").get(verifyToken, getAllUsers);

// Register user
router.route("/register").post(createUser);

// Search user by name
router.route("/search/name").get(verifyToken, findUserByName);

// Search user by email
// router.route("/search/email").get(verifyToken, findUserByEmail);

// Search user by number
router.route("/search/contact").get(verifyToken, findUserByContact);

// Get user by ID
// User has to be logged in to be able to view other user's profile
router.route("/myprofile/:userId").get(verifyToken, getUser).put(verifyToken, changeUserPassword);


module.exports = router;
