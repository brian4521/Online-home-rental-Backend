let express=require('express')
let authRouter=express.Router()

let {getlogin, loggedin, loggedout, getsignup, postsignup} = require('../controllers/authController')


authRouter.get("/login",getlogin)

authRouter.post("/login",loggedin)


authRouter.post("/logout",loggedout)
authRouter.get("/signup",getsignup)
authRouter.post("/signup",postsignup)



module.exports=authRouter