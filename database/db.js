const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db = process.env.MONGO_URI;

const Connection = async()=>{
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully")
    }catch(error){
        console.log("Error while connecting to DB", error);
    }
}

module.exports = Connection;