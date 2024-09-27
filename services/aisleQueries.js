const prisma = require('../db/prismaClient');

// Get all aisles
async function getAllAisle() {
    try {
        return await prisma.aisle.findMany();
    } catch (error) {
        console.error('Failed to get aisles', error.message);
        throw error;
    }
}

module.exports = { getAllAisle }