const express=require('express');
const {validateSignUpData}=require('../utils/validation.js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../models/user.js');

// creating the instance of the router object
const authRouter=express.Router();

// add data in database
authRouter.post('/signup',async(req,res)=>{
    // validation of the data
    validateSignUpData(req);

    // Encrypt the password and also once we encrypt it, we cannot decrypt it
    const {firstName,lastName,emailId,password}=req.body;
    const saltRounds=10;
    const passwordHash=await bcrypt.hash(password,saltRounds);

    // creating the instance of user model
    // const user=new User({
    //     firstName:'Virat',
    //     lastName:'Kohli',
    //     emailId:'ViratKohli18@gmail.com',
    //     password:'11223344',
    // });

    const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    });

    try{
        await user.save();
        res.send('User added successfully');
    }catch(error){
        res.status(400).send('Error occured');
    }
});

// Now creating the login Api
authRouter.post('/login',async(req,res)=>{

    try{
        const {emailId,password}=req.body;
        if(!emailId||!password){
            return res.status(400).send('Invalid Credentials');
        }

        // to check if emailId is present
        const user=await User.findOne({emailId:emailId});
        if(!user){
            return res.status(400).send('Invalid Credentials');
        }

        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            // create a jwt token
            const token=jwt.sign({id: user._id},"ajsAhshr#1i@",{expiresIn:"1d"});

            // Add a token to cookie and send the response back to user
            res.cookie("token",token, {expires: new Date(Date.now()+24*60*60*1000)});
            res.send('User Login successful');
        }else{
            return res.status(400).send('Invalid Credentials');
        }
    }catch(error){
        res.status(400).send('Error occured');
    }
});

// to create the logout api
authRouter.post('/logout',async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.status(200).send("Logged out successfully");
});

module.exports=authRouter;