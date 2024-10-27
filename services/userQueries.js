const prisma = require("../db/prismaClient");
const bcrypt = require("bcrypt");

// Get all users
async function getAllUserQuery() {
  try {
    return await prisma.user.findMany({
      include: {
        posts: true,
        transactionsAsBuyer: true,
        transactionsAsTraveller: true,
        reviewsGiven: true,
        reviewsReceived: true,
      },
    });
  } catch (error) {
    console.error("Failed to get users", error.message);
    throw error;
  }
}

// Get specific user
async function getUserQuery(userId) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: true,
        transactionsAsBuyer: true,
        transactionsAsTraveller: true,
        reviewsGiven: true,
        reviewsReceived: true,
      },
    });
  } catch (error) {
    console.error("User not found", error.message);
    throw error;
  }
}

// Find user by name
async function findUserByNameQuery(name) {
  try {
    return await prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive"
        },
      },
      include: {
        posts: true,
        transactionsAsBuyer: true,
        transactionsAsTraveller: true,
        reviewsGiven: true,
        reviewsReceived: true,
      },
    });
  } catch (error) {
    console.error("User not found", error.message);
    throw error;
  }
}

// Search user by email
async function findUserByEmailQuery(email) {
  try {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.error("User not found", error.message);
    throw error;
  }
}

// Search user by phone number
async function findUserByContactQuery(contact) {
  try {
    return await prisma.user.findUnique({
      where: {
        contact: contact,
      },
    });
  } catch (error) {
    console.error("User not found", error.message);
    throw error;
  }
}

// Change user password
async function changeUserPasswordQuery(userId, password) {
  // const { email, password } = userInfo;

  try {
    const newPassword = await bcrypt.hash(password, 10);

    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword
      }
    })
  } catch (error) {
    console.error("User not found", error.message);
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
      },
    });
  } catch (error) {
    console.error("Failed to register user", error.message);
    throw error;
  }
}

module.exports = {
  getAllUserQuery,
  getUserQuery,
  createUserQuery,
  findUserByNameQuery,
  findUserByEmailQuery,
  findUserByContactQuery,
  changeUserPasswordQuery
};
