const prisma = require("../db/prismaClient");

// Get all users
async function getAllPostsQuery() {
  try {
    return await prisma.post.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            contact: true,
            profilePicture: true,
            city: true,
            country: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to get posts", error.message);
    throw error;
  }
}

// Get one post
async function getPostQuery(postId) {
  try {
    return await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.error("Failed to get post", error.message);
    throw error;
  }
}

// Create post
async function createPostQuery(postData, userId) {
  const {
    title,
    origin,
    destination,
    origin_departure,
    origin_arrival,
    destination_departure,
    destination_arrival,
    origin_pickup_location,
    destination_pickup_location,
    restrictions,
    capacity,
    itemType,
    fee,
    additionalDetails,
  } = postData;

  try {
    return await prisma.post.create({
      data: {
        title: title,
        origin: origin,
        destination: destination,
        origin_departure: origin_departure,
        origin_arrival: origin_arrival,
        destination_departure: destination_departure,
        destination_arrival: destination_arrival,
        origin_pickup_location: origin_pickup_location,
        destination_pickup_location: destination_pickup_location,
        restrictions: restrictions,
        capacity: parseFloat(capacity),
        itemType: itemType,
        fee: parseFloat(fee),
        additionalDetails: additionalDetails,
        userId: userId,
      },
    });
  } catch (error) {
    console.error("Failed to create post", error.message);
    throw error;
  }
}

module.exports = { getAllPostsQuery, getPostQuery, createPostQuery };
