const express = require('express');
const router = express.Router();
const { getAllPosts, getPost, createPost } = require('../controllers/postController');
const { verifyToken } = require('../middleware/verifyToken')

// Get all users / Create new user
router.route("/").get(getAllPosts).post(verifyToken, createPost);

// Get post by ID
router.route("/:postId").get(getPost);


module.exports = router;
