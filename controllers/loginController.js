const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../services/userQueries");

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // check if user exists in the database
    const user = await db.findUserByEmailQuery(email);
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    };

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    };

    // generate token if the user is authenticated
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { loginUser };
