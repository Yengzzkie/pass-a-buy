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

// Create new user
async function createUserQuery(userInfo) {
    const { name, email, password, profilePicture, bio, location, trustRating, reviewCount } = userInfo;
    try {
        return await prisma.user.create({
            data: {
                name: name,
                email: email,
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

module.exports = { getAllUserQuery, createUserQuery }