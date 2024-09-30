const express = require('express');
const router = express.Router();
const { getAllPosts, createPost } = require('../controllers/postController');

// Get all users / Create new user
router.route("/").get(getAllPosts).post(createPost);


module.exports = router;
