const express=require('express');
const {jwtUserAuth}=require('../middlewares/authMiddleware.js');
const ConnectionRequest=require('../models/connectionRequest');
const userRouter=express.Router();

// to get all the pending connection for the loggedIn user
userRouter.get('/user/requests/received',jwtUserAuth,async(req,res)=>{

    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",["firstName","lastName"])

        res.json({
            message: "Connection requests fetched successfully",
            data:connectionRequests,
        });
    }catch(error){
        return res.status(500).send('Something went wrong');
    }
});

module.exports=userRouter;