const db = require("../services/postQueries");

async function getAllPosts(req, res) {
  try {
    const posts = await db.getAllPostsQuery();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createPost(req, res) {
  try {
    const newPost = await db.createPostQuery(req.body);
    res.json(newPost);
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllPosts,
  createPost,
};
