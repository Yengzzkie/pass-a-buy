const express = require('express');
const router = express.Router();
const { getAllAisles, getShelfByName, getShelfContent, deleteAllShelves } = require('../controllers/aisleController')

// All shelves route
router.route('/').get(getAllAisles).delete(deleteAllShelves);

// Get shelf by name
router.route('/search').get(getShelfByName);

// Get shelf content
router.get('/:shelf', getShelfContent);

module.exports = router;