const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, getUserById, createUser, findUserByName, findUserByEmail, findUserByContact, changeUserPassword, deleteUser } = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');

// Get all users
router.route("/").get(verifyToken, getAllUsers);

// Register user
router.route("/register").post(createUser);

// Search user by name
router.route("/search/name").get(verifyToken, findUserByName);

// Search user by email
router.route("/search/email").get(verifyToken, findUserByEmail);

// Search user by number
router.route("/search/contact").get(verifyToken, findUserByContact);

// Delete user's account
router.route("/delete/:id").delete(deleteUser)

// Get user by ID
router.route("/search/:userId").get(verifyToken, getUserById);

// User has to be logged in to be able to view other user's profile
router.route("/myprofile/:userId").get(verifyToken, getUser).put(verifyToken, changeUserPassword);


module.exports = router;
