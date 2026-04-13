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
        }).populate("fromUserId",["firstName","lastName","age","gender"])

        res.json({
            message: "Connection requests fetched successfully",
            data:connectionRequests,
        });
    }catch(error){
        return res.status(500).send('Something went wrong');
    }
});

// to get all the accepted connections
userRouter.get('/user/connections',jwtUserAuth,async(req,res)=>{
    
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id, status:"accepted"},
                {fromUserId: loggedInUser._id, status:"accepted"},
            ]
        }).populate("fromUserId",["firstName","lastName","age","gender"]).populate("toUserId",["firstName","lastName","age","gender"])

        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }

            return row.fromUserId._id;
        });
        res.json({data:data});
    }catch(error){
        return res.status(500).send('Something went wrong');
    }
});

module.exports=userRouter;