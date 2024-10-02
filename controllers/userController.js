const db = require("../services/userQueries");

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await db.getAllUserQuery();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get specific user
async function getUser(req, res) {
  try {
    const user = await db.getUserQuery(req.params.postId);
    res.json(user);
  } catch (error) {
    console.error("Error fetching post", error);
    res.status(404).json({ error: "Post not found" });
  }
}

// Create new user
async function createUser(req, res) {
  try {
    const newUser = await db.createUserQuery(req.body);
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteUsernames(req, res) {
  await db.deleteAllUsernames();
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUsernames,
};
