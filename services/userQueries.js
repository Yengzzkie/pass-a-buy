const prisma = require("../db/prismaClient")

// Get all users
async function getAllUserQuery() {
    try {
        return await prisma.user.findMany({
            include: {
                posts: true, 
                transactionsAsBuyer: true, 
                transactionsAsTraveller: true, 
                reviewsGiven: true, 
                reviewsReceived: true 
              }
        });
    } catch (error) {
        console.error('Failed to get aisles', error.message);
        throw error;
    }
}

module.exports = { getAllUserQuery }