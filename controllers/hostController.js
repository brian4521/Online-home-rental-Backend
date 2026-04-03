let path=require("path")
let rootDir=require("../utility/utilitypath")
const House = require("../models/homes")
const { error } = require("console")

exports.homeRegister=(req,res,next)=>{
 
  res.render('host/edit-home',{editing:false})
}


exports.hosthomes=(req,res,next)=>{
  House.fetchData().then(homeRegistered=>{
      console.log("here is homeregistered data dfvsdgvs",homeRegistered) 

     res.render('host/host-home-list', {homeRegistered})
  })

  // res.sendFile(path.join(rootDir,"views","home.html"))
  
} 

exports.homeAdded=(req,res,next)=>{
  const {house,price,location,rating,photoUrl,description}=req.body;

  const home= new House(house,price,location,rating,photoUrl,description) 
  home.save().then(()=>{
    console.log('data saved successfully')
  })
  .then(()=>{
    res.redirect('/host/host-home-list')

  })
  .catch(err=>{
    console.log("error occured",err)
  })


    
  
  // res.sendFile(path.join(rootDir,"views","host/homeAdded.html"))
    
}

exports.editHomes=(req,res,next)=>{
   const editID = req.params.editId
   const editing = req.query.editing === 'true'
   console.log("edit homes is here:",editID,editing)

   House.findHome(editID).then(foundHome=>{
    
    if(!foundHome){
      console.log("home for edit was not found")
      return res.redirect('/host/host-home-list')
    }
      console.log("Edit home was found",foundHome)
      res.render('host/edit-home',{editing, foundHome})
   })


}

exports.applyEditHomes=(req,res,next)=>{
  console.log("here are edit request",req.body)
  const {id,house,price,location,rating,photoUrl,description}=req.body;
  console.log("here are edit homes",house,price,location,rating,photoUrl,description)

  const home= new House(house, price, location, rating, photoUrl, description, id) 

  //save() is async so sometimes remaining code gets executed before it so used then promise
  
  home.save()
  .then(()=>{
       res.redirect('/host/host-home-list')
  })
  .catch(err=>{
    console.log("error occured",err)
  })


  
}   

exports.applyDeleteHomes=(req,res,next)=>{

  const deleteId=req.params.deleteId

  House.deleteHome(deleteId).then(()=>{
      res.redirect('/host/host-home-list')
  
  })
  .catch(error=>{
    console.log("error occured while deleting",error)
  })
   
    
    
  


 







}