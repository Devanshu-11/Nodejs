const mongoose=require('mongoose');

// creating the payment schema
const paymentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        require:true,
    },
    paymentId:{
        type:String,
    },
    OrderId:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        require:true,
    },
    amount:{
        type:Number,
        require:true,
    },
    currency:{
        type:String,
        require:true,
    },
    receipt:{
        type:String,
        require:true,
    },
    notes:{
        firstName:{
            type:String,
        },
        lastName:{
            type:String,
        },
        membership:{
            type:String,
        },
    },
},{
    timestamps:true,
});

const Payment=mongoose.model('Payment',paymentSchema);
module.exports=Payment;