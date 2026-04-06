const express=require("express")
let storeRouter=require("./Routes/storeRoute")
let {hostRouter}=require("./Routes/hostRoute")
let path=require("path")
let rootDir=require("./utility/utilitypath")
let app=express()
let {pagenotFound}=require('./controllers/404pagecontroller')

const { default: mongoose } = require("mongoose")


app.set('view engine', 'ejs')
app.set('views','views')





app.use(express.static(path.join(rootDir,"public")))
app.use(express.static(path.join(rootDir,"src")))




app.use((req,res,next)=>{
  console.log(req.url,req.method)
  next()
})


app.use(express.urlencoded())


app.use(storeRouter)
app.use("/host",hostRouter)

app.use((req,res,next)=>{
  res.status(400).render('404page')
})


PORT=5000



const Db_Url="mongodb+srv://root:root@codehype.qgks6p4.mongodb.net/myDB?retryWrites=true&w=majority"

mongoose.connect(Db_Url).then(()=>{
  console.log("connected to mongoose")
  app.listen(PORT,()=>{
   console.log("server has started")
})
  

})
.catch(err=>{
  console.log("error while connecting to mongoose",err)
})
