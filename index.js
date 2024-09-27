const prisma = require("./db/prismaClient");
const { getAllProduct, createProduct } = require("./services/productQueries");
const { getAllProducts } = require("./controllers/productController");
const { getAllAisle } = require("./services/aisleQueries");

// *********************************************
// THIS FILE IS FOR TESTING DATABASE QUERIES!!!

async function main() {
  const product = await prisma.product.findMany({
    where: {
      name: {
        contains: 'pot',
        mode: 'insensitive'
      }
    },
  });

  console.log(product)
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
