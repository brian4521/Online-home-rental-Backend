let express=require('express')
let authRouter=express.Router()

let {getlogin, loggedin, loggedout} = require('../controllers/authController')


authRouter.get("/login",getlogin)

authRouter.post("/login",loggedin)


authRouter.post("/logout",loggedout)



module.exports=authRouter