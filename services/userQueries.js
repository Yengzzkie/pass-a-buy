const prisma = require("../db/prismaClient");
const bcrypt = require("bcrypt");

// @desc: Get all users
// @access: Admin privilege
async function getAllUserQuery() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        contact: true,
        profilePicture: true,
        bio: true,
        city: true,
        country: true,
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

// @desc: Get user by ID
// @access: Private
async function getUserByIdQuery(userId) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        contact: true,
        profilePicture: true,
        bio: true,
        city: true,
        country: true,
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

// @desc: Find users by name
// @access: Public
async function findUserByNameQuery(name) {
  try {
    return await prisma.user.findMany({
      where: {
        firstName: {
          contains: name,
          mode: "insensitive"
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        contact: true,
        profilePicture: true,
        bio: true,
        city: true,
        country: true,
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

// EDIT
async function findUserByEmailQueryForAuthentication(email) {
  try {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        emailVerified: true,
        password: true,
        role: true,
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
        firstName: true,
        lastName: true,
        email: true,
        contact: true,
        profilePicture: true,
        bio: true,
        city: true,
        country: true,
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
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        contact: true,
        profilePicture: true,
        bio: true,
        city: true,
        country: true,
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

// @desc: Verify user's email. From false to true
// @access: Private
async function verifyEmailQuery(userData) {
  const { id } = userData;
  
  try {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        emailVerified: true
      }
    })
  } catch (error) {
    console.error("Password change failed", error.message);
    throw error;
  }
}

// @desc: Create new user
// @access: Public
async function createUserQuery(userInfo, password) {
  const { firstName, lastName, email, contact, city, country } = userInfo;
  
  try {
    return await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        contact: contact,
        password: password,
        city: city,
        country: country,
      },
    });
  } catch (error) {
    console.error("Failed to register user", error.message);
    throw error;
  }
}

// Delete user's account
// Private
async function deleteUserQuery(id) {
  try {
    return await prisma.user.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    
  }
}

module.exports = {
  getAllUserQuery,
  getUserQuery,
  getUserByIdQuery,
  createUserQuery,
  findUserByNameQuery,
  findUserByEmailQuery,
  findUserByContactQuery,
  changeUserPasswordQuery,
  verifyEmailQuery,
  findUserByEmailQueryForAuthentication,
  deleteUserQuery
}; 
