const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../services/userQueries");

// Login controller, this module will check if a user exists in the database
async function authenticateUser(req, res) {
  const { email, password } = req.body;
  const existingToken = req.cookies.authToken;

  try {

    if (existingToken) {
      return res.status(400).json({ message: 'Another user is logged in, please logout first then log back in.' })
    }

    // check if user exists in the database
    const user = await db.findUserByEmailQuery(email);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // check if password matches from database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // generate token if the user is authenticated
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // store the signed token to cookies
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // set this to true on production
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.json({
      message: `Hi ${user.name}, you have logged in successfully.`,
      id: user.id,
      email: user.email,
      name: user.name,
      status: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" }, error.message);
  }
}

// Logout controller
async function logoutUser(req, res) {
  try {
    if (!req.cookies.authToken) {
      return res.json({ message: 'Already logged out. Please log back in.' })
    }

    res.clearCookie('authToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    return res.json({ message: error.message});
  }
}

module.exports = { authenticateUser, logoutUser };
