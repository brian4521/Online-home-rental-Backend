const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongo_URL = "mongodb+srv://root:root@codehype.qgks6p4.mongodb.net/myDB?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(mongo_URL)
    .then(client => {
      _db = client.db('myDB');  // 🔹 make DB name same as URL
      console.log("✅ MongoDB connected");
      callback();               // 🔹 run server only after DB is ready
    })
    .catch(err => {
      console.log('❌ Error while connecting to MongoDB:', err);
    });
};

const getData = () => {
  if (!_db) {
    throw new Error('❌ MongoDB not connected');
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getData = getData;