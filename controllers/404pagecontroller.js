
// let path=require("path")
// let rootDir=require("../utility/utilitypath")

exports.pagenotFound=(req,res,next)=>{
   res.status(404).render("404page", {isLoggedIn : req.isLoggedIn})
 
}


//  res.status(404).sendFile(path.join(rootDir,"views","404page.html"))