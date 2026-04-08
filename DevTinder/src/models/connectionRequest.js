const mongoose=require('mongoose');

// creating the connection request schema
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,

        // creating the reference to the user collection
        ref: "User",
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

// create an index on the fromUserId field
connectionRequestSchema.index({fromUserId:1,toUserId:1});

// creating a model
const ConnectionRequest=mongoose.model('ConnectionRequest',connectionRequestSchema);
module.exports=ConnectionRequest;