const prisma = require("./db/prismaClient");
const { findUserByEmailQueryForAuthentication } = require("./services/userQueries");


// *********************************************
// THIS FILE IS FOR TESTING DATABASE QUERIES!!!

async function main() {
  const user = await findUserByEmailQueryForAuthentication("mang.jose@yahoo.com")
  console.log(user);
  // const users = await prisma.user.findMany();
  // for (const user of users) {
  //   if (user.location) {
  //     const [city, country] = user.location.split(',').map(str => str.trim());
  //     await prisma.user.update({
  //       where: { id: user.id },
  //       data: { city, country },
  //     });
  //   }
  // }
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
