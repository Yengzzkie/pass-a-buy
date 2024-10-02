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
        console.error('Failed to get users', error.message);
        throw error;
    }
}

// Get specific user
async function getUserQuery(postId) {
    try {
        return await prisma.user.findUnique({
            where: {
                id: userId
            },
            
        })
    } catch (error) {
        console.error('User not found', error.message);
        throw error;
    }
}

// Create new user
async function createUserQuery(userInfo) {
    const { name, email, contact, password, profilePicture, bio, location } = userInfo;
    try {
        return await prisma.user.create({
            data: {
                name: name,
                email: email,
                contact: contact,
                password: password,
                profilePicture: profilePicture,
                bio: bio,
                location: location,
            }
        })
    } catch (error) {
        console.error('Failed to register user', error.message);
        throw error;
    }
}

module.exports = { getAllUserQuery, getUserQuery, createUserQuery }