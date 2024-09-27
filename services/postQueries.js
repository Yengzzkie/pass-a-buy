const prisma = require("../db/prismaClient")

// Get all users
async function getAllPostsQuery() {
    try {
        return await prisma.post.findMany();
    } catch (error) {
        console.error('Failed to get aisles', error.message);
        throw error;
    }
}

module.exports = { getAllPostsQuery }