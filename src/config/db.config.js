const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017",{
           
        })
        console.log("Database is connected");
    }catch(error)
    {
        console.log("Mongo DB Connection error: " + error);
    }
}

module.exports = connectDB;