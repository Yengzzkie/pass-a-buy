const prisma = require("./db/prismaClient");
const { findUserByEmailQueryForAuthentication } = require("./services/userQueries");
const nodemailer = require("nodemailer");




// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USERNAME,
//     pass: process.env.GMAIL_PASS,
//   }
// });

// async function sendMail( to, subject, html) {

//   const mailOptions = {
//     from: '"Support Team" <passabuy@gmail.com>',
//     to,
//     subject,
//     html,
//   }

//   try {
//     const result = await transporter.sendMail(mailOptions)
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

// sendMail('gatchalian.manuel@gmail.com', 'Hello world', '<h1>Hello, this is a test message</h1>' );

// *********************************************
// THIS FILE IS FOR TESTING DATABASE QUERIES!!!

// async function main() {

//   const posts = await prisma.post.findMany();

//   for (const post of posts) {
//     await prisma.post.update({
//       where: { id: post.id },
//       data: {
//         origin: post.fromLocation,
//         destination: post.toLocation,
//         origin_departure: post.travelDate,
//         origin_arrival: post.returnDate,
//         destination_departure: new Date("2024-11-05T16:27:35.853Z"),
//         destination_arrival: new Date("2024-11-05T16:27:35.853Z"),
//       },
//     });
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// THIS FILE IS FOR TESTING DATABASE QUERIES!!! run node index.js to run test
// *********************************************

// USE THIS TO DELETE USERS FROM THE DATABASE (FOR TESTING PURPOSES ONLY)
async function deleteUser(email) {

    const user = await prisma.user.delete({
        where: {
            email: email
        }
    })
}

deleteUser('forragnamobile@gmail.com')