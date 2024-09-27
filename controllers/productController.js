const db = require('../services/productQueries');

// Get all products
async function getAllProducts(req, res) {
    try {
        const products = await db.getAllProductQuery();
        res.json(products);
    } catch (error) {
        console.error('Failed to fetch products', error.message);
        res.status(500).send('Couldn\'t get products')
    }
}

// Create/insert new product
async function createProduct(req, res) {
    try {
        const newProduct = await db.createProductQuery(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Failed to create new product', error.message);
        res.status(500).send('Failed to create new product')
    }
}

// Find a product
async function findProduct(req, res) {
    try {
        const searchQuery = req.query.product;

        // check for empty query
        if (!searchQuery) {
            return res.status(400).send('Product query is required');
        }

        const product = await db.searchProductQuery(searchQuery);

        if (!product.length) {
            return res.status(404).send('No product found with that name');
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('There is no product that goes by that name', error.message);
        res.status(500).send('There is no product that goes by that name')
    }
}

// Delete all products
async function deleteAllProducts(req, res) {
    try {
        await db.deleteAllProducts();
        res.status(200).json({message: 'Products successfully deleted'});
    } catch (error) {
        console.error('Failed to delete products', error.message);
        res.status(500).send('Failed to delete all products');
    }
}

module.exports = { getAllProducts, createProduct, deleteAllProducts, findProduct }