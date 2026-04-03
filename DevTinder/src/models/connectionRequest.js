const mongoose=require('mongoose');

// creating the connection request schema
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        },
    }
},{
    timestamps:true,
});

// creating a model
const ConnectionRequest=mongoose.model('ConnectionRequest',connectionRequestSchema);
module.exports=ConnectionRequest;