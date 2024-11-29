const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = process.env.PORT || 8000;

require("dotenv").config();

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with frontend URL in productions
  credentials: true,
};

// CORS
app.use(cors(corsOptions));

// cookie-parser
app.use(cookieParser());

// Middleware to parse form-data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

// Welcome route
app.get("/", (req, res) => res.send("Welcome to Pass-a-buy!"));

// Login route
app.use("/login", require("./routes/loginRoute"));

// Logout route
app.use("/logout", require("./routes/logoutRoute"))

// Send email route (inbound)
app.use("/support", require("./routes/sendEmailRoute"));

// User route
app.use("/users", require("./routes/userRoute"));

// Posts route
app.use("/posts", require("./routes/postRoute"));

// Verify email route
app.use("/verify-email", require("./routes/emailVerificationRoute"));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
