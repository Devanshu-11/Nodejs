const express=require('express');
const {jwtUserAuth}=require('../middlewares/authMiddleware.js');
const {validateEditProfileData}=require('../utils/validation.js');
const profileRouter=express.Router();

// to view the profile of the user
profileRouter.get('/profile/view',jwtUserAuth,async(req,res)=>{

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

// to edit the profile of user
profileRouter.patch('/profile/edit',jwtUserAuth,async(req,res)=>{

    try{
        if(!validateEditProfileData(req)){
            res.status(400).send('Invalid Edit Request');
        }

        const loggedInUser=req.user;
        Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key]);
        await loggedInUser.save();

        res.send('Profile updated successfully')
    }catch(error){
        res.status(400).send('Error occured');
    }
});

module.exports=profileRouter;