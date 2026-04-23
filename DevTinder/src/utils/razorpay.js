const Razorpay=require('razorpay');
require('dotenv').config();

// creating the instance
var instance=new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
});

module.exports=instance;