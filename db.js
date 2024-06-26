const mongoose = require("mongoose");
//define the mongoDB connection url
const mongoURL = "mongodb://localhost:27017/hotels"; // replace myDatabse with db name...here dbname = hotels
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintains a defualt cnnection object representing the MongoDB connection
const db = mongoose.connection;

//define some events listeners
db.on('connected', ()=>{
    console.log('Connected to MongoDB server successfully');
});

db.on('error', (err)=>{
    console.log("MongoDB connnection error", err);
});

db.on('disconnected', ()=>{
    console.log("MongoDB disconnected ");
});

// Export the database connection to use it in other pages
module.exports = db;