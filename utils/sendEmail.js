const nodemailer = require("nodemailer");
require('dotenv').config()
const user = process.env.USER;
const pass = process.env.PASS;
const host = process.env.HOST;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: user, 
      pass: pass, 
    },
});

async function sendConfirmationEmail(name, email, token) {
  const mailOptions = {
    from: user,
    to: email,
    subject: "Email Confirmation",
    html: `<h1>Hello ${name}</h1>
    <p>Thank you for registering on our website</p>
    <p>Please click on the link below to confirm your email</p>
    <a href="${host}/api/auth/confirm/${token}">Confirm Email</a>`,
  };

  await transporter.sendMail(mailOptions);
  console.log("verifiction email was sent");
}

module.exports = sendConfirmationEmail