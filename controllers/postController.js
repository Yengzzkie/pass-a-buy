const db = require("../services/postQueries");

async function getAllPosts(req, res) {
    try {
      const usernames = await db.getAllPostsQuery();
      res.json(usernames);
    } catch (error) {
      console.error("Error fetching usernames:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {
    getAllPosts,
};
