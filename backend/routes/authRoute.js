const router = require("express").Router();
const {registerClient,VerifyUser,loginClient,dashboard, forgetPassword,ResetPassword}= require('../controllers/authController')
const {protect} = require('../Middlewares/authMiddleware')

router.post('/register', registerClient)
router.get("/confirm/:confirmationCode",VerifyUser)
router.post('/login', loginClient)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword/:token',ResetPassword)










module.exports = router