const db = require("../services/postQueries");

async function getAllPosts(req, res) {
  try {
    const posts = await db.getAllPostsQuery();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(404).json({ error: "Posts not found" });
  }
}

async function getPost(req, res) {
  try {
    const post = await db.getPostQuery(req.params.postId);
    res.json(post);
  } catch (error) {
    console.error("Error fetching post", error);
    res.status(404).json({ error: "Post not found" });
  }
}

async function createPost(req, res) {
  try {
    const newPost = await db.createPostQuery(req.body, req.user.id);
    res.json(newPost);
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(400).json({ error: "Bad request, please check your input for missing field" });
  }
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
};
