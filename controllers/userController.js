const db = require("../services/userQueries");
const bcrypt = require('bcrypt');

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

// Get one user
async function getUser(req, res) {
  try {
    const user = await db.getUserQuery(req.params.userId);
    res.json(user);
  } catch (error) {
    console.error("User not found", error);
    res.status(404).json({ error: "User not found" });
  }
}

// Search user by name
async function findUserByName(req, res) {
  try {
    const user = await db.findUserByNameQuery(req.query.name);

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user);
  } catch (error) {
    console.error("User not found", error);
    res.status(404).json({ error: "User not found" });
  }
}

// Search user by email
async function findUserByEmail(req, res) {
  try {
    const user = await db.findUserByEmailQuery(req.query.email);

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user);
  } catch (error) {
    console.error("User not found", error);
    res.status(404).json({ error: "User not found" });
  }
}

// Search user by number
async function findUserByContact(req, res) {
  try {
    const user = await db.findUserByContactQuery(req.query.contact);

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user);
  } catch (error) {
    console.error("User not found", error);
    res.status(404).json({ error: "User not found" });
  }
}

// Create new user
async function createUser(req, res) {
  try {
    const existingUser = db.findUserByEmailQuery(req.body.email);

    if (existingUser) {
      res.status(400).json({ message: 'User with that email already exists' })
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.createUserQuery({...req.body, password: hashedPassword});
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
  findUserByName,
  findUserByEmail,
  findUserByContact,
  createUser,
  deleteUsernames,
};
