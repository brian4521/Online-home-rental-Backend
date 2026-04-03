let express=require("express")
let hostRouter=express.Router()


let {homeRegister,homeAdded,hosthomes,editHomes,applyEditHomes,applyDeleteHomes}=require('../controllers/hostController')

hostRouter.get("/home",homeRegister)


hostRouter.post("/homes",homeAdded)
hostRouter.get("/host-home-list",hosthomes)
hostRouter.get("/edit-home/:editId",editHomes)
hostRouter.post("/edit-home",applyEditHomes)
hostRouter.get("/delete-home/:deleteId",applyDeleteHomes)


module.exports={hostRouter}
