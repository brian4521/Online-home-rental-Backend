


module.exports = class Favourite{
  constructor(houseId){
    this.houseId=houseId
  }


 save(){  
  const db=getData()
  return db.collection('favourites').findOne({houseId:this.houseId}).then(foundfav=>{
    if(!foundfav){
       return db.collection('favourites').insertOne(this)
  

    }
    return Promise.resolve()
  })
 
 }
 
 

 static viewFavourite(callback){
  const db = getData()
  return db.collection('favourites').find().toArray()
   
 }



static deleteHome(deleteId){
   const db=getData()
   return db.collection('favourites').deleteOne({houseId: deleteId})
  
 
}


}