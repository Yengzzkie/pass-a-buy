const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASS,
  },
});
// this is an outbound email, when a user registers
async function sendMail(userData, verificationUrl) {
  const { firstName, lastName, email } = userData;

  try {
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: `Verify your email`,
      text: `${verificationUrl}`,
      html: `
        <div style="color: #F7F7F7; background-color: #1693b6; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px;">
          <h2 style="text-align: center; color: #fff; text-shadow: -5px 5px 3px #0e7490">Welcome to Pass-A-Buy!</h2>
          <p>Hello <strong>${firstName} ${lastName}</strong>,</p>
          <p>Thank you for registering with us! Please verify your email by clicking the button below:</p>
          <div style="text-align: center; margin: 20px;">
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
          </div>
          <p style="font-style: italic;">If you did not create an account with us, you can safely ignore this email.</p>
          <p>Best regards,<br>Pass-A-Buy Support Team</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #2E2E2E; text-align: center;">&copy; ${new Date().getFullYear()} Pass-A-Buy. All rights reserved.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    if (!result) {
      console.log("Failed sending verification email");
    }

    console.log("Support email sent:", result);
  } catch (error) {
    console.error("Error sending support email:", error);
  }
}
// `Hello ${name}, please verify your email by clicking the following link: ${verificationUrl}`
// send verification token to user's email
// async function sendMail(req, res) {
//   const { name, email, subject, message } = req.body;

//   try {
//     const mailOptions = {
//       from: email,
//       to: process.env.GMAIL_USERNAME,
//       subject: `${subject}`,
//       text: `Support request from ${name} <${email}>:\n\n${message}`,
//     };

//     const result = await transporter.sendMail(mailOptions);

//     if (!result) {
//       return res.status(500).json({ message: "Failed to send email" });
//     }

//     console.log("Support email sent:", result);
//     res.status(200).json({ message: "Support email sent successfully" });
//   } catch (error) {
//     console.error("Error sending support email:", error);
//     res.status(500).json({ message: "An error occurred while sending email" });
//   }
// }

module.exports = { sendMail };
