const mongoose = require('mongoose')


const favouriteSchema = mongoose.Schema({
  houseid : {type:mongoose.Schema.Types.ObjectId, ref:'House', required:true, unique:true}
})


module.exports = mongoose.model('Favourite',favouriteSchema)

