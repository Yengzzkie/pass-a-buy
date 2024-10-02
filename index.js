const prisma = require("./db/prismaClient");
const { getAllProduct, createProduct } = require("./services/productQueries");
const { getAllProducts } = require("./controllers/productController");
const { getAllAisle } = require("./services/aisleQueries");

// *********************************************
// THIS FILE IS FOR TESTING DATABASE QUERIES!!!

async function main() {
  const post = await prisma.post.findUnique({
    where: {
       id: "ca1c7ed4-57a1-4804-bbeb-846bfb0a4603"
    },
  });

  console.log(post);
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
