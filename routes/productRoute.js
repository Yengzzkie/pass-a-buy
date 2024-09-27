const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, deleteAllProducts, findProduct } = require('../controllers/productController');

// All product route
router.route('/').get(getAllProducts).post(createProduct).delete(deleteAllProducts)

// Search for specific product via query
router.get('/search', findProduct)

module.exports = router;