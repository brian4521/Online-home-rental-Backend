let path=require("path")
let rootDir=require("../utility/utilitypath")
let fs=require("fs")



const favouritepath=path.join(rootDir,'data','favouriteList.json')

module.exports = class Favourite{
static addToFavourite(id,callback){
  Favourite.viewFavourite((items)=>{

    id = id?.toString().trim()

    if(!id) return callback("Invalid ID")

    if(items.includes(id)){
      callback("house already exist")
    } else {
      items.push(id)
      fs.writeFile(favouritepath, JSON.stringify(items), callback)
    }

  })
}
 static viewFavourite(callback){
   fs.readFile(favouritepath,(err,data)=>{
      callback(!err ? JSON.parse(data) : [])
     
    })
   
 }


// static deleteFavHomes(deleteId, callback){
//   Favourite.viewFavourite((favlist)=>{

//     const filteredFavourite = favlist
//       .filter(Boolean)
//       .filter(favitem => favitem.trim() !== deleteId.toString().trim())

//     fs.writeFile(favouritepath, JSON.stringify(filteredFavourite), callback)

//   })
// }
static deleteHome(deleteId,callback){
 Favourite.viewFavourite(homelistId=>{
    homelistId=homelistId.filter(item=> deleteId !== item)
    console.log("filtered data is :", homelistId)





      fs.writeFile(favouritepath,JSON.stringify(homelistId),err=>{
        if(callback){
          callback(err)
        }
      })

  


  })
}


}