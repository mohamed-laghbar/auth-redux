const express = require('express');
const app = express();
require('dotenv').config();
require('./config/db');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/manager',require('./routes/ManagerRoute'));
app.use('/api/client',require('./routes/ClientRoute'));
app.use('/api/livreur',require('./routes/LivreurRoute'));







const port = process.env.PORT || 5000;

app.listen(port)