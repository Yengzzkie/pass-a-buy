const prisma = require("./db/prismaClient");
const { findUserByEmailQueryForAuthentication } = require("./services/userQueries");


// *********************************************
// THIS FILE IS FOR TESTING DATABASE QUERIES!!!

async function main() {
  // Step 1: Retrieve all posts
  const posts = await prisma.post.findMany();

  // Step 2: Iterate and update each post individually
  for (const post of posts) {
    await prisma.post.update({
      where: { id: post.id },
      data: {
        origin: post.fromLocation,
        destination: post.toLocation,
        origin_departure: post.travelDate,
        origin_arrival: post.returnDate,
        destination_departure: new Date("2024-11-05T16:27:35.853Z"),
        destination_arrival: new Date("2024-11-05T16:27:35.853Z"),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// THIS FILE IS FOR TESTING DATABASE QUERIES!!! run node index.js to run test
// *********************************************
