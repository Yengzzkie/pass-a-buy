const express = require('express');
const router = express.Router();
const { getAllPosts, getPost, createPost } = require('../controllers/postController');

// Get all users / Create new user
router.route("/").get(getAllPosts).post(createPost);

router.route("/:postId").get(getPost);


module.exports = router;
