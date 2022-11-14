const nodemailer = require("nodemailer");
require('dotenv').config()
const user = process.env.EMAIL_ADDRESS;
const pass = process.env.EMAIL_PASS;


const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass
  },
});

sendConfirmationEmail = (name, email,token) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p> Please confirm your email by clicking on the following link</p>
          <a href='http://localhost:3000/api/auth/confirm/${token}'> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };


  async function sendResetPasswordEmail(name, email, token) {
    const mailOptions = {
      from: user,
      to: email,
      subject: "Reset Password",
      html: `<h1>Hello ${name}</h1>
      <p>Please click on the link below to reset your password</p>
      <a href="http://localhost:1337/api/auth/resetpassword/${token}">Reset Password</a>`,
    };
  
    await transporter.sendMail(mailOptions);
    console.log("reset password email was sent");
  }

  module.exports = {sendResetPasswordEmail,sendConfirmationEmail}

