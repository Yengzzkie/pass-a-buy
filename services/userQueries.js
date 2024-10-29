const prisma = require("../db/prismaClient");
const bcrypt = require("bcrypt");

// @desc: Get all users
// @access: Admin privilege
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

// @desc: Get user's (own) profile
// @access: Private
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

// @desc: Find users by name
// @access: Public
async function findUserByNameQuery(name) {
  try {
    return await prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive"
        },
      },
      select: {
        name: true,
        email: true,
        contact: true,
        profilePicture: true,
        bio: true,
        location: true,
        trustRating: true,
        reviewCount: true,
        createdAt: true,
        isVerified: true,
        emailVerified: true,
        paymentVerified: true,
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

// @desc: Search user by email
// @access: Private
async function findUserByEmailQuery(email) {
  try {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        contact: true,
        profilePicture: true,
        bio: true,
        location: true,
        trustRating: true,
        reviewCount: true,
        createdAt: true,
        isVerified: true,
        emailVerified: true,
        paymentVerified: true,
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

// Search user by phone number
async function findUserByContactQuery(contact) {
  try {
    return await prisma.user.findUnique({
      where: {
        contact: contact,
      },
      select: {
        name: true,
        email: true,
        contact: true,
        profilePicture: true,
        bio: true,
        location: true,
        trustRating: true,
        reviewCount: true,
        createdAt: true,
        isVerified: true,
        emailVerified: true,
        paymentVerified: true,
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

// @desc: Change user password
// @access: Private
async function changeUserPasswordQuery(userId, password) {
  // const { email, password } = userInfo;

  try {
    console.log(password)
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
    console.error("Password change failed", error.message);
    throw error;
  }
}

// @desc: Create new user
// @access: Public
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
