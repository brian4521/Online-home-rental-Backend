

exports.getlogin = (req, res, next) => {
   res.render("auth/login",{isLoggedIn : req.isLoggedIn});


};

exports.loggedin=(req,res,next) =>{
  console.log(req.body)
  res.cookie("isLoggedIn",true)
  res.redirect("/")
}


exports.loggedout=(req,res,next)=>{
  res.cookie("isLoggedIn",false)
  res.redirect("/")
}
