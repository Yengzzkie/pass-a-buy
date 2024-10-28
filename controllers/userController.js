const db = require("../services/userQueries");
const bcrypt = require('bcrypt');

// @desc: Get all users
// @access: Admin privilege
async function getAllUsers(req, res) {
  try {
    const users = await db.getAllUserQuery();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// @desc: Get user's profile
// @access: Private
async function getUser(req, res) {
  try {
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({ message: "Access forbidden" });
    }

    const user = await db.getUserQuery(req.params.userId);
    res.json(user);
  } catch (error) {
    console.error("User not found", error);
    res.status(404).json({ error: "User not found" });
  }
}

// Search user by name
// @access: Public
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

// Change user password
async function changeUserPassword(req, res) {
  try {
    const { newPassword, confirmNewPassword } = req.body;
    const loggedUserId = req.params.userId;

    // compare the logged in user from the user ID attached to the cookie (req.user.id)
    if (loggedUserId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden, You can only change your own password." })
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "New password and confirmation do not match" });
    }

    const result = await db.changeUserPasswordQuery(req.user.id, req.body.password);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(req)
    res.status(200).json({ message: "Password updated successfully", data: result })
  } catch (error) {
    console.error("User not found", error);
    res.status(404).json({ error: "User not found" });
  }
}
 
// Register new user
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
  changeUserPassword,
  deleteUsernames,
};
