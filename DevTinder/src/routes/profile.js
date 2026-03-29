const express=require('express');
const {jwtUserAuth}=require('../middlewares/authMiddleware.js');
const profileRouter=express.Router();

// to get the profile of the user
profileRouter.get('/profile',jwtUserAuth,async(req,res)=>{

    try{
        const user=req.user;
        if(!user){
            throw new Error("Please Login again");
        }
        res.send(user);
    }catch(error){
        res.status(400).send('Error occured');
    }
});

module.exports=profileRouter;