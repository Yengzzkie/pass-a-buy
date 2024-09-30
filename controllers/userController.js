const db = require("../services/userQueries");

async function getAllUsers(req, res) {
  try {
    const usernames = await db.getAllUserQuery();
    res.json(usernames);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

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
  createUser,
  deleteUsernames,
};
