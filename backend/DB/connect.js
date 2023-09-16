const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URI= process.env.MONGO_URI


const connect = async ()=>{
    await mongoose.connect(URI);
    console.log("DB connected");
}

module.exports = connect;