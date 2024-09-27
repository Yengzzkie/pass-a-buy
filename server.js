const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
require('dotenv').config();

// CORS
app.use(cors());

// Middleware to parse form-data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

// User route
app.use('/users', require('./routes/userRoute'))

// Posts route
app.use('/posts', require('./routes/postRoute'));

// // Product route
// app.use('/products', require('./routes/productRoute'));

// // Shelf route
// app.use('/aisles', require('./routes/aisleRoute'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
