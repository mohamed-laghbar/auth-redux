const router = require("express").Router();
const { Router } = require("express");
const {registerClient,loginClient}= require('../controllers/ClientController')


router.post('/', registerClient)
router.post('/login', loginClient)












module.exports = router