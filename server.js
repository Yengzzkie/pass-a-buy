const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = process.env.PORT || 8000;

require("dotenv").config();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://sleepy-beach-58614-ab8029504aff.herokuapp.com/' 
    : 'http://localhost:5173',
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
// app.get("/", (req, res) => res.send("Welcome to Pass-a-buy!"));

// Login route
app.use("/login", require("./server/routes/loginRoute"));

// Logout route
app.use("/logout", require("./server/routes/logoutRoute"))

// Send email route (inbound)
app.use("/support", require("./server/routes/sendEmailRoute"));

// User route
app.use("/users", require("./server/routes/userRoute"));

// Posts route
app.use("/posts", require("./server/routes/postRoute"));

// Verify email route
app.use("/verify-email", require("./server/routes/emailVerificationRoute"));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
