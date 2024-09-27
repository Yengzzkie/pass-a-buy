const db = require('../services/aisleQueries');

// Get all shelves
async function getAllAisles(req, res) {
    try {
        const aisles = await db.getAllAisle();
        if (aisles.length === 0) {
            res.status(404).json({message: 'There is no existing shelf, please create one'})
        }
        res.json(aisles);
    } catch (error) {
        console.error('Failed to fetch shelf', error.message);
    }
}

// Get single shelf by name
async function getShelfByName(req, res) {
    try {
        const shelfName = req.query.shelf;
        const shelf = await db.getShelfByName(shelfName);
        if (shelf.length === 0) {
            return res.status(404).json({ message: 'Shelf not found' });
        }
        res.json(shelf);
    } catch (error) {
        console.error('There\'s no shelf that goes by that name', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get specific shelve's contents
async function getShelfContent(req, res) {
    try {
        const shelfName = req.query.shelf;
        const shelf = await db.getShelfContent(shelfName)
        res.json(shelf);
    } catch (error) {
        console.error('Failed to get shelf contents', error.message);
    }
}

// Delete all shelves
async function deleteAllShelves(req, res) {
    try {
        await db.deleteAllShelves()
        res.json({message: 'Shelves successfully deleted'});
    } catch (error) {
        console.error('Failed to delete shelves', error.message);
    }
}

module.exports = { getAllAisles, getShelfByName, getShelfContent, deleteAllShelves }