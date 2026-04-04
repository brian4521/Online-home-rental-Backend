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
exports.favouritelist = (req, res, next) => {
  // Using your model's viewFavourite method
  Favourite.viewFavourite().then(favouriteitems => {
    
    // Extracting houseId strings from the favourites collection
    const favouriteIdList = favouriteitems.map(fav => fav.houseId.toString());

    // Using your House model's fetchData method
    House.fetchData().then(homeRegistered => {
      console.log("IDs in Favourites:", favouriteIdList);
      console.log("Total Homes in DB:", homeRegistered.length);

      // Filtering the full home list based on what is in the favouriteIdList
      const allFavouriteList = homeRegistered.filter((home) => 
        favouriteIdList.includes(home._id.toString())
      );

      // Rendering your specific view path and variable
      res.render("store/favlist", {
        allFavouriteList: allFavouriteList,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  }).catch(err => {
    console.log("Error loading favourites:", err);
    res.redirect('/');
  });
};

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
   const favid = req.body.id.trim()
   console.log("favourite id is here :",favid)
   const fav = new Favourite(favid)
   
   fav.save().then(res=>{
      console.log("fav id saved",res)
   })
  .catch(err=>{
   console.log("error occured while adding favourite",err)
  })
  .finally(()=>{
     res.redirect('/favourite')

  })






}


exports.deleteFavourite=(req,res,next)=>{

   const homeId=req.params.homeId
   console.log("delete favourite id is",homeId)
   Favourite.deleteHome(homeId)
   .then(res=>{
      console.log("fav item is deleted",res)
   })
  .catch(err=>{
   console.log("error occured while deleting favourite",err)
  })
  .finally(()=>{
     res.redirect('/favourite')

  })

   
   
 

}