const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const token = req.cookies.authToken; 

  // Check if the token is missing
  if (!token) {
    return res.status(403).json({ message: "Access Denied: No Token Provided. Please login or create an account" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  });
}

module.exports = { verifyToken };
