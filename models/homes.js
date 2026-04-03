const { ObjectId } = require("mongodb");
const { getData } = require("../utility/databaseUtil");


module.exports = class House{
  constructor(house,price,location,rating,photoUrl,description,_id){
    this.house=house;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photoUrl=photoUrl;
    this.description=description;
    this._id=_id;
  }

save(){
 const db=getData()
 return db.collection('homes').insertOne(this)

 


}

static fetchData(){
 const db=getData()
 return db.collection('homes').find().toArray()




}
static findHome(homeID){
 const db=getData()
 return db.collection('homes').find({_id: new ObjectId(String(homeID))}).next()



  
}


static deleteHome(deleteId){



}



}