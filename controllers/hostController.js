let path = require("path");
let rootDir = require("../utility/utilitypath");
const House = require("../models/homes");
const { error } = require("console");

exports.homeRegister = (req, res, next) => {
  res.render("host/edit-home", { editing: false, isLoggedIn : req.isLoggedIn, user: req.session.user, });
};

exports.hosthomes = (req, res, next) => {
  House.find().then((homeRegistered) => {
    console.log("here is homeregistered data dfvsdgvs", homeRegistered);

    res.render("host/host-home-list", { homeRegistered, isLoggedIn : req.isLoggedIn, user: req.session.user, });
  });

  // res.sendFile(path.join(rootDir,"views","home.html"))
};

exports.homeAdded = (req, res, next) => {
  const { house, price, location, rating, photoUrl, description } = req.body;

  const home = new House({
    house,
    price,
    location,
    rating,
    photoUrl,
    description,
  });
  home
    .save()
    .then(() => {
      console.log("data saved successfully");
    })
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("error occured", err);
    });

  // res.sendFile(path.join(rootDir,"views","host/homeAdded.html"))
};

exports.editHomes = (req, res, next) => {
  const editID = req.params.editId;
  const editing = req.query.editing === "true";
  console.log("edit homes is here:", editID, editing);

  House.findById(editID).then((foundHome) => {
    if (!foundHome) {
      console.log("home for edit was not found");
      return res.redirect("/host/host-home-list");
    }
    console.log("Edit home was found", foundHome);
    res.render("host/edit-home", { editing, foundHome, isLoggedIn : req.isLoggedIn, user: req.session.user, });
  });
};

exports.applyEditHomes = (req, res, next) => {
  console.log("here are edit request", req.body);
  const { _id, house, price, location, rating, photoUrl, description } = req.body;
 
  House.findById(_id).then((singleHome)=>{
    singleHome.house=house;
    singleHome.price=price;
    singleHome.location=location;
    singleHome.rating=rating;
    singleHome.photoUrl=photoUrl;
    singleHome.description=description;
    singleHome.save().then(() => {  
      console.log("home updated") 
      
    })
    .catch(err=>{
      console.log("error while updating home",err)
    })

      res.redirect("/host/host-home-list");
    })
    .catch(err=>{
      console.log("error while finding home",err)
    })
   

  //save() is async so sometimes remaining code gets executed before it so used then promise
};

exports.applyDeleteHomes = (req, res, next) => {
  const deleteId = req.params.deleteId; 

  House.findByIdAndDelete(deleteId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("error occured while deleting", error);
    });
};
