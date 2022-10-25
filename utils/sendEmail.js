const nodemailer = require("nodemailer");
require('dotenv').config()
const user = process.env.EMAIL_ADDRESS;
const pass = process.env.EMAIL_PASS;


const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email,token) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p> Please confirm your email by clicking on the following link</p>
          <a href='http://localhost:1337/api/auth/confirm/${token}'> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };

