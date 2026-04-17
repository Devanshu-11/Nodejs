const express=require('express');
const {jwtUserAuth}=require('../middlewares/authMiddleware.js');
const ConnectionRequest=require('../models/connectionRequest.js');
const User=require('../models/user.js');
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

// feed Api-to get the profile of all users
userRouter.get('/feed',jwtUserAuth,async(req,res)=>{

    try{
        // user should able to see all user cards except-
        // 1- his own card
        // 2- his connection 
        // 3- ignored people 
        // 4- already sent the connection request

        // example-akshay,elon,mark,donald,dhoni,virat 
        // new user got registered- Rahul
        // initially rahul see all profile of all people except himself
        // Rahul->Akshay=rejected then akshay profile will not be shown again
        // Rahul->elon=accepted then elon profile will also need been in the field
        // In case of elon, he will see the profile of everyone else except rahul

        const loggedInUser=req.user;
        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50?50:limit;
        const skip=limit*(page-1);

        // find all connection Request that i have sent or received
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        // save all them in the set
        const hideUsersFromFeed=new Set();
        connectionRequest.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        // Now find all the users which are not in the set
        const users=await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(["firstName","lastName","age","gender"]).skip(skip).limit(limit);

        res.send(users);
    }catch(error){
        return res.status(500).send('Something went wrong');
    }
});

module.exports=userRouter;