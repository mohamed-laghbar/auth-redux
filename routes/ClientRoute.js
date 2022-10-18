const router = require("express").Router();
const {registerClient,loginClient,dashboard}= require('../controllers/ClientController')
const {protect} = require('../Middlewares/authMiddleware')

router.post('/', registerClient)
router.post('/login', loginClient)
router.get('/dashboard',protect,dashboard)












module.exports = router