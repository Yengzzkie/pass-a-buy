const prisma = require("./db/prismaClient");
const { getAllProduct, createProduct } = require("./services/productQueries");
const { getAllProducts } = require("./controllers/productController");
const { getAllAisle } = require("./services/aisleQueries");

// *********************************************
// THIS FILE IS FOR TESTING DATABASE QUERIES!!!

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@ymail.com",
      password: "456xyz",
      location: "British Columbia, Vancouver",
    },
  });

  console.log(user);
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

// THIS FILE IS FOR TESTING DATABASE QUERIES!!!
// *********************************************
