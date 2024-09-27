const db = require("../services/userQueries");

async function getAllUsers(req, res) {
    try {
      const usernames = await db.getAllUserQuery();
      res.json(usernames);
    } catch (error) {
      console.error("Error fetching usernames:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

async function deleteUsernames(req, res) {
    await db.deleteAllUsernames();
}

module.exports = {
  getAllUsers,
  createUsernamePost,
  deleteUsernames
};
