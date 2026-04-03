let path=require("path")
let rootDir=require("../utility/utilitypath")
const House = require("../models/homes")
const Favourite = require("../models/favouritemodel")


exports.homes=(req,res,next)=>{
  House.fetchData().then(homeRegistered=>{
      console.log("this is home list data",homeRegistered)

     res.render('store/home-list', {homeRegistered})
  })

  // res.sendFile(path.join(rootDir,"views","home.html"))
  
}

exports.bookings=(req,res,next)=>{


     res.render('store/bookings')
 


}
exports.favouritelist = (req,res,next)=>{

  Favourite.viewFavourite((favouriteitems)=>{

   //  House.fetchData((homeRegistered)=>{
      House.fetchData().then(homeRegistered=>{

      const allFavouriteList = favouriteitems
        .map(id => homeRegistered.find(items => items.id.toString() === id.toString().trim()))
       

      console.log("favourite list data are", allFavouriteList)
      if(allFavouriteList.length==0){
         res.send('<h1>There are no favourites</h1>')
      }
      else{

      res.render('store/favlist',{ allFavouriteList })
      }

    })

  })

}
exports.indexFetch=(req,res,next)=>{

   House.fetchData().then(homeRegistered=>{
        res.render('store/index', {homeRegistered})

   })
   


}

exports.homeDetail=(req,res,next)=>{   
   const homeID=req.params.homeId
   console.log(homeID)
   House.findHome(homeID).then(foundHome=>{
     
      if(!foundHome){
         return res.send('house not found')
      }
      // console.log(foundHome)
      res.render('store/home-detail',{foundHome})
   })
 
}

exports.favouritepath=(req,res,next)=>{
   console.log("favourite delete id is", req.body.id)
   
   
   Favourite.addToFavourite(req.body.id,error=>{
      if(error){
         console.log("Error occured while adding to favourite",error)   
      }
      res.redirect('/favourite')
   })




}


exports.deleteFavourite=(req,res,next)=>{

   const homeId=req.params.homeId
   Favourite.deleteHome(homeId,err=>{
      if(err){
         console.log("error occured while deleting from favourite",err)
      }

      res.redirect('/favourite')
   })
 

}