const db = require("../services/postQueries");

async function getAllPosts(req, res) {
  try {
    const posts = await db.getAllPostsQuery();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(404).json({ error: "Posts not found" });
  }
}

async function getUserPosts(req, res) {
  try {
    const posts = await db.getUserPostsQuery(req.params.userId);
    // console.log(posts, req.params.userId)
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching post", error);
    res.status(404).json({ error: "Post not found" });
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

async function deletePost(req, res) {
  try {
    const postToDelete = await db.deletePostQuery(req.params.postId)
    res.json({ message: `Post with id: ${postToDelete} deleted succesfully`})
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAllPosts,
  getUserPosts,
  getPost,
  createPost,
  deletePost,
};
