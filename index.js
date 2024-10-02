const prisma = require("./db/prismaClient");
const { getAllProduct, createProduct } = require("./services/productQueries");
const { getAllProducts } = require("./controllers/productController");
const { getAllAisle } = require("./services/aisleQueries");

// *********************************************
// THIS FILE IS FOR TESTING DATABASE QUERIES!!!

async function main() {
  const user = await prisma.user.update({
    where: {
       id: "b21b8830-eb23-4355-9e5c-1f5f35d59e13"
    },
    data: {
      contact: "4325829904"
    }
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
