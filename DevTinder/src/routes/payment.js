const express=require('express');
const {jwtUserAuth}=require('../middlewares/authMiddleware.js');
const razorpayInstance=require('../utils/razorpay.js');
const Payment=require('../models/payment.js');
const {validateWebhookSignature,}=require("razorpay/dist/utils/razorpay-utils");
const paymentRouter=express.Router();
require('dotenv').config();

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

// creating the webhooks
paymentRouter.post("/payment/webhook",async(req,res)=>{
    
    try{
        const webhookSignature=req.get("X-Razorpay-Signature");
        console.log("Webhook Signature", webhookSignature);

        const isWebhookValid=validateWebhookSignature(JSON.stringify(req.body),webhookSignature,process.env.RAZORPAY_WEBHOOK_SECRET);

        if(!isWebhookValid){
            console.log("Invalid Webhook Signature");
            return res.status(400).json({msg:"Webhook signature is invalid"});
        }
        console.log("Valid Webhook Signature");

        // to extracts payment information from the webhook request body
        const paymentDetails=req.body.payload.payment.entity;

        // update my payment status in database
        const payment=await Payment.findOne({orderId:paymentDetails.order_id});
        payment.status=paymentDetails.status;
        await payment.save();
        console.log("Payment saved");

        // return the status
        return res.status(200).json({ msg: "Webhook received successfully" });

    }catch(error){
        return res.status(500).json({
            success:false,
        });
    }
});

module.exports=paymentRouter;