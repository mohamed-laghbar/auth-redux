const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const express = require('express');
const nodemailer = require('../utils/sendEmail')
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser())
const inputValidation = require('../utils/inputValidation.js')
const generateToken = require('../utils/generateToken')

const registerClient = async (req, res, next) => {

  const { name, email, password } = req.body;


  if (!name || !email || !password) {
    res.json({ message: 'please fill all the feilds' })
  }
  new inputValidation().FormValidation(
    name,
    email,
    password
  );

  const existUser = await User.findOne({ email })

  if (existUser) {
    res.status(403).json('User already exists')

  }

  const hachedPassword = await bcrypt.hash(password, 10)
  const verification_token = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    password: hachedPassword,
    confirmationCode: verification_token
  })
  nodemailer.sendConfirmationEmail(name, email, verification_token);
  res.json('User Created  ')

}

const VerifyUser = (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.json('User not found!')
      }

      user.status = "Active";
      
      user.save((err) => {
        if (err) {
          return res.json(err)

        }else console.log(`this email ${user.email} is Acitve Now`)
      });
    })
    .catch((e) => console.log("error", e));
};


const loginClient = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {

    if (user.status == "Active") {
      const token = await generateToken(user._id);
      await res.cookie('token', token, { secure: false, maxAge: 100000 });
      res.json('you are logged in')
    } else res.json('Please verify your account')

  } else {
    res.status(400).json('invalid details')
  }
}




const forgetPassword = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.json("Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.json("Invalid Email");
  }

  const reset_token = generateToken(user._id); // 
  sendResetPasswordEmail(user.name, user.email, reset_token);

  res.status(200).json('Ok');
};



const dashboard = (req, res) => {
  res.json('client dashboard')
}




module.exports = { registerClient, VerifyUser, loginClient, dashboard, forgetPassword }