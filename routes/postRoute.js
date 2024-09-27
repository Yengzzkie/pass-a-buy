const express = require('express');
const router = express.Router();
const { getAllPosts } = require('../controllers/postController');

// Get all users / Create new user
router.route("/").get(getAllPosts);


module.exports = router;
