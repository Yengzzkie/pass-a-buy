const prisma = require("../db/prismaClient")

// Get all users
async function getAllPostsQuery() {
    try {
        return await prisma.post.findMany();
    } catch (error) {
        console.error('Failed to get posts', error.message);
        throw error;
    }
}

// Get one post
async function getPostQuery(postId) {
    try {
        return await prisma.post.findUnique({
            where: {
                id: postId
            }
        })
    } catch (error) {
        console.error('Failed to get post', error.message);
        throw error;
    }
}

// Create post
async function createPostQuery(postData, userId) {
    const { fromLocation, toLocation, travelDate, returnDate, capacity, itemType, fee, additionalDetails } = postData;

    try {
        return await prisma.post.create({
            data: {
                fromLocation: fromLocation,
                toLocation: toLocation,
                travelDate: travelDate,
                returnDate: returnDate,
                capacity: parseFloat(capacity),
                itemType: itemType,
                fee: parseFloat(fee),
                additionalDetails: additionalDetails,
                userId: userId
            }
        })
    } catch (error) {
        console.error('Failed to create post', error.message);
        throw error;
    }
}



module.exports = { getAllPostsQuery, getPostQuery, createPostQuery }