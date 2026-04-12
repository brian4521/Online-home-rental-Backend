const express=require("express")
let storeRouter=require("./Routes/storeRoute")
let {hostRouter}=require("./Routes/hostRoute")
let path=require("path")
let rootDir=require("./utility/utilitypath")
const Db_Url="mongodb+srv://root:root@codehype.qgks6p4.mongodb.net/myDB?retryWrites=true&w=majority"
let app=express()
let {pagenotFound}=require('./controllers/404pagecontroller')
let session=require('express-session')
let mongoDbStore=require('connect-mongodb-session')(session)

const { default: mongoose } = require("mongoose")
const authRouter = require("./Routes/authRoute")



app.set('view engine', 'ejs')
app.set('views','views')





app.use(express.static(path.join(rootDir,"public")))
app.use(express.static(path.join(rootDir,"src")))




app.use((req,res,next)=>{
  console.log(req.url,req.method)
  next()
})

const store = new mongoDbStore({
  uri : Db_Url,
  collection : 'sessions'

})


app.use(express.urlencoded())
app.use(session({
    secret : "hello this is me",
    resave : false,
    saveUninitialized : true,
    store 
}))

app.use((req, res, next) => {
 
  req.isLoggedIn = req.session.isLoggedIn
  console.log(req.isLoggedIn);
  next();
});

app.use(storeRouter)
app.use("/host", (req,res,next)=>{
  if(req.isLoggedIn){
    next()
  }
  else{
    res.redirect("/login")
  }
})

app.use("/host", hostRouter)
app.use(authRouter)

app.use((req,res,next)=>{
  res.status(400).render('404page')
})


PORT=5000





mongoose.connect(Db_Url).then(()=>{
  console.log("connected to mongoose")
  app.listen(PORT,()=>{
   console.log("server has started")
})
  

})
.catch(err=>{
  console.log("error while connecting to mongoose",err)
})
