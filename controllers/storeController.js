let path = require("path");
let rootDir = require("../utility/utilitypath");
const House = require("../models/homes");
const Favourite = require("../models/favouritemodel");

exports.homie = (req, res, next) => {
  House.find().then((homeRegistered) => {
    console.log("this is home list data", homeRegistered);

    res.render("store/home-list", { homeRegistered });
  });

  // res.sendFile(path.join(rootDir,"views","home.html"))
};

exports.bookings = (req, res, next) => {
  res.render("store/bookings");
};
exports.favouritelist = (req, res, next) => {
  // Using your model's viewFavourite method
  Favourite.find()
  .populate('houseid')
  .then((favouriteitems) => {
      // Extracting houseId strings from the favourites collection
      const favouriteIdList = favouriteitems.map((fav) =>
        fav.houseid
      );

        res.render("store/favlist", {
          allFavouriteList:favouriteIdList,
          pageTitle: "My Favourites",
          currentPage: "favourites",
        });
      
    })
    .catch((err) => {
      console.log("Error loading favourites:", err);
      res.redirect("/");
    });
};

exports.indexFetch = (req, res, next) => {
  House.find().then((homeRegistered) => {
    res.render("store/index", { homeRegistered });
  });
};

exports.homeDetail = (req, res, next) => {
  const homeID = req.params.homeId;
  console.log(homeID);
  House.findById(homeID).then((foundHome) => {
    if (!foundHome) {
      return res.send("house not found");
    }
    // console.log(foundHome)
    res.render("store/home-detail", { foundHome });
  });
};

exports.favouritepath = (req, res, next) => {
  const favid = req.body.id.trim();

  Favourite.findOne({houseid: favid}).then((resp)=>{
    if(resp){
      console.log("already exist favourite",resp)
    }
    else{
      const fav = new Favourite({houseid: favid})
      fav.save().then((saved)=>{
        console.log("favourite saved succesfully", saved)
      })
      .catch(err=>{
        console.log("error occured while saving favourite id",err)
      })
    }
    res.redirect("/favourite");

  })

};

exports.deleteFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("delete favourite id is", homeId);
  Favourite.findOneAndDelete({houseid:homeId})
    .then((res) => {
      console.log("fav item is deleted", res);
    })
    .catch((err) => {
      console.log("error occured while deleting favourite", err);
    })
    .finally(() => {
      res.redirect("/favourite");
    });
};
