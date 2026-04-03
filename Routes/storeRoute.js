let express=require("express")
let storeRouter=express.Router()
let path=require("path")
let rootDir=require("../utility/utilitypath")
const { homeRegistered } = require("./hostRoute")
let {homes,bookings,favouritelist,indexFetch, homeDetail, favouritepath, deleteFavourite, } =require('../controllers/storeController')

storeRouter.get("/",indexFetch)
storeRouter.get("/booking",bookings)
storeRouter.get("/favourite",favouritelist)
storeRouter.get("/home",homes)
storeRouter.get("/home/:homeId",homeDetail)
storeRouter.post("/favourites",favouritepath)
storeRouter.post("/favouritedelete/:homeId",deleteFavourite)

module.exports=storeRouter