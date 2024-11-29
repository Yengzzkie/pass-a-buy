const express = require('express');
const router = express.Router();
const { getAllPosts, getPost, createPost, deletePost, getUserPosts } = require('../controllers/postController');
const { verifyToken } = require('../middleware/verifyToken');
const { checkEmailIsVerified } = require('../middleware/checkEmailIsVerified');

// Get all users / Create new user
router.route("/").get(verifyToken, checkEmailIsVerified, getAllPosts).post(verifyToken, checkEmailIsVerified, createPost);

// Get post by ID
router.route("/:postId").get(verifyToken, getPost).delete(verifyToken, deletePost);

// Get user's posts
router.route("/user/:userId").get(verifyToken, getUserPosts)

module.exports = router;
