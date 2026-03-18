const mongoose=require('mongoose');
const dns = require('dns');
dns.setServers(["1.1.1.1","8.8.8.8"]);
require('dotenv').config();

// to connect to database
const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URL);
}

module.exports=connectDB;