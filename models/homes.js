
const mongoose = require("mongoose");

/*

    this.house=house;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photoUrl=photoUrl;
    this.description=description;
    this._id=_id;

    save()
    find()
    findById(homeID)
    deleteHome(deleteId)

*/

const homeSchema = mongoose.Schema({
  house: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photoUrl: String,
  description: String,
});

module.exports = mongoose.model("House", homeSchema);
