const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser())
const inputValidation = require('../utils/inputValidation.js')
const generateToken = require('../utils/generateToken')
const sendConfirmationEmail = require('../utils/sendEmail')

const registerClient =async (req, res , next)=>{

    const {name,email,password}= req.body;
    new inputValidation().FormValidation(
      name,
      email,
      password
    );

    if(!name || !email || !password){
        res.json({message: 'please fill all the feilds'})
    }

    const existUser = await User.findOne({email})

    if(existUser){
        res.status(403).json('User already exists')
        
    } 

    const hachedPassword = await bcrypt.hash(password,10)
    const verification_token = crypto.randomBytes(32).toString("hex");

     const user = await User.create({
    name,
    email,
    password: hachedPassword,
    confirmationCode:verification_token
    })


    sendConfirmationEmail(name, email, verification_token);
    res.status(201).json(
      'email was sent'
    );
  } 
    



const loginClient = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
  const token =  generateToken(user._id);
 await res.cookie('token', token, {secure: false, httpOnly: true, maxAge : 10000000});
  res.json(`Your logged in + your token is : ${req.cookies.token}`)

    
  } else {
    res.status(400).json('invalid details')
  }
}

const dashboard = (req,res)=>{
res.json('client dashboard')
}




module.exports = {registerClient,loginClient,dashboard}