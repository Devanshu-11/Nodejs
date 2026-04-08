const express=require('express');
const {jwtUserAuth}=require('../middlewares/authMiddleware.js');
const ConnectionRequest=require('../models/connectionRequest.js');
const User=require('../models/user.js');
const requestRouter=express.Router();

// sending the connection request
requestRouter.post('/request/send/:status/:toUserId',jwtUserAuth,async(req,res)=>{

    try{
        // here we can make a status and it can be ignored or interested
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json("Invalid Status type");
        }

        if(fromUserId.equals(toUserId)){
            return res.status(400).send('You cannot send request to yourself');
        }

        // check if toUserId is valid or not
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(400).send('User not found');
        }

        // check if there is existing connection request
        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId:fromUserId, toUserId:toUserId},
                {fromUserId:toUserId, toUserId: fromUserId},
            ],
        });

        if(existingConnectionRequest){
            return res.status(400).send('Connection Request already exists');
        }

        // create an instance of connection request
        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data=await connectionRequest.save();
        return res.send({
            message:'Connection Request successfully',
            data,
        });
    }catch(error){
        res.status(400).send('Error occured');
    }
});

requestRouter.post('/request/review/:status/:requestId',jwtUserAuth,async(req,res)=>{

    try{
        const loggedInUser=req.user;
        const status=req.params.status;
        const requestId=req.params.requestId;

        // check
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json("Invalid Status type");
        }

        // check the connection request
        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        });

        if(!connectionRequest){
            return res.status(400).send('Connection request is not found');
        }

        // change the status
        connectionRequest.status=status;
        const data=await connectionRequest.save();

        res.send({
            message:'Connection Request changed successfully',
            data,
        });

    }catch(error){
        res.status(400).send('Error occured');
    }
});

module.exports=requestRouter;