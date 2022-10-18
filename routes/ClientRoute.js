const router = require("express").Router();
const { Router } = require("express");
const {registerClient}= require('../controllers/ClientController')


router.post('/', registerClient)












module.exports = router