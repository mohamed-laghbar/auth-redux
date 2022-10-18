const router = require("express").Router();




router.get('/admin' , (req,res)=>{
    res.json('admin route')
})







module.exports = router