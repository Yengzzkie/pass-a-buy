const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../services/userQueries");

// Login controller, this module will check if a user exists in the database
async function authenticateUser(req, res) {
  const { email, password } = req.body;

  try {
    // check if user exists in the database
    const user = await db.findUserByEmailQuery(email);
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    };

    // check if password matches from database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    };

    // generate token if the user is authenticated
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // store the signed token to cookies
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false, // set this to true on production
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.json({ message: `Hi ${user.name}, you have logged in successfully.`, user: user.id, email: user.email, name: user.name, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Logout controller
async function logoutUser(req, res) {

  const token = res.cookie.authToken;

  if (!token) {
    return res.json({ message: 'Already logged out. Please log back in.' })
  }

  res.clearCookie('authToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });

  res.json({ message: 'Logged out successfully' })

}

module.exports = { authenticateUser, logoutUser };
