

exports.getlogin = (req, res, next) => {
   res.render("auth/login",{isLoggedIn : req.isLoggedIn});


};

exports.loggedin=(req,res,next) =>{
  console.log(req.body)

  req.session.isLoggedIn = true;  
  // res.cookie("isLoggedIn",true)
  res.redirect("/")
}


exports.loggedout=(req,res,next)=>{
  req.session.destroy(()=>{
     res.redirect("/")

  })
 
}

exports.getsignup = (req, res, next) => {
   res.render("auth/signup",{isLoggedIn : req.isLoggedIn});


};



exports.postsignup = (req, res, next) => {
   res.render("auth/signup",{isLoggedIn : req.isLoggedIn});


};