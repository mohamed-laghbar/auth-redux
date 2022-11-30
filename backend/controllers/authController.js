const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const express = require("express");
const nodemailer = require("../utils/sendEmail");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const inputValidation = require("../utils/inputValidation.js");
const generateToken = require("../utils/generateToken");

const registerClient = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!(email  || password) ) {
    res.status(204).json("User name or Password feild are empty");

  }
  const existUser = await User.findOne({ email });
  try {
    if (!existUser) {
      const hachedPassword = await bcrypt.hash(password, 10);
      const verification_token = crypto.randomBytes(32).toString("hex");

      const user = await User.create({
        name,
        email,
        password: hachedPassword,
        confirmationCode: verification_token,
      });
      nodemailer.sendConfirmationEmail(name, email, verification_token);
      res
        .status(201)
        .json("User Created seccusfully, Please verify your email ");
    } else if (existUser) {
      res.status(403).json("User already exists");
    } else res.status(500).json("oops something went wrong please refresh the page");
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * It takes the email and password from the request body, finds the user in the database, compares the
 * password with the hashed password in the database, if the password matches, it generates a token and
 * sends it back to the client
 * @param req - The request object.
 * @param res - The response object.
 */
const loginClient = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.status == "Active") {
      const token = await generateToken(user._id);
      await res.cookie("token", token, { secure: false, maxAge: 100000 });
      res.status(200).json("you are logged in");
    } else res.status(401).json("Please verify your account");
  } else {
    res.status(403).json("Wrong Email or Password");
  }
};





const VerifyUser = async (req, res, next) => {
  await User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.json("User not found!");
      }

      user.status = "Active";

      user.save((err) => {
        if (err) {
          return res.json(err);
        } else res.redirect("http://localhost:3001/login");
      });
    })
    .catch((e) => console.log("error", e));
};

const forgetPassword = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(403).json("No user found with this email");
  } else {
    const reset_token = generateToken(user._id); //
    nodemailer.sendResetPasswordEmail(user.name, user.email, reset_token);
    res.status(200).json("Email sent, please check your email");
  }
};

const ResetPassword = async (req, res, next) => {
  const { token } = req.params;
  const password = await req.body;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const _id = user.id;
    const password = bcrypt.hashSync(req.body.password, 8);
    await User.findByIdAndUpdate(_id, {
      password,
    });
    /*  */

    return res.status(200).send("password changed");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerClient,
  VerifyUser,
  loginClient,
  ResetPassword,
  forgetPassword,
};
