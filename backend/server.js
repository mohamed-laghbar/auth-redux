const express = require('express');
var cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();
require('./config/db');
var cors = require('cors')
app.use(cookieParser());

app.use(cors({ origin:true, credentials:true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',require('./routes/authRoute'));



const port = process.env.PORT || 5000;

app.listen(port)