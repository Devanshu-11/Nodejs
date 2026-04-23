const express=require('express');
const {jwtUserAuth}=require('../middlewares/authMiddleware.js');
const razorpayInstance=require('../utils/razorpay.js');
const Payment=require('../models/payment.js');
const paymentRouter=express.Router();

// create order
paymentRouter.post('/payment/create',jwtUserAuth,async(req,res)=>{

    try{
        const order=await razorpayInstance.orders.create({
            "amount":50000, // In paise
            "currency":"INR",
            "receipt":`receipt_${Date.now()}`,
            "partial_payment":false,
            "notes":{
                "firstName":"value3",
                "lastName":"value2",
                "membershipType":"silver",
            },
        });

        // save it in my database
        const payment=new Payment({
            userId:req.user._id,
            OrderId:order.id,
            status:order.status,
            amount:order.amount,
            currency:order.currency,
            receipt:order.receipt,
            notes:order.notes,
        });
        const savedPayment=await payment.save();
        res.json({...savedPayment.toJSON()});
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Could not create order",
        });
    }
});

module.exports=paymentRouter;