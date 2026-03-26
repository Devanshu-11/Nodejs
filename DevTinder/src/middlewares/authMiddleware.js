const jwt=require('jsonwebtoken');
const User=require('../models/user');

const adminAuth=((req,res,next)=>{
    console.log('Admin auth is getting checked');
    // logic of checking if the request is authorized or not
    const token='xyz';
    const isAdminAuthorized=token==='xyz';

    if(!isAdminAuthorized){
        res.status(401).send('Unauthorized request');
    }else{
        next();
    }
});

const userAuth=((req,res,next)=>{
    console.log('User auth is getting checked');
    // logic of checking if the request is authorized or not
    const token='xyz';
    const isAdminAuthorized=token==='xyz';

    if(!isAdminAuthorized){
        res.status(401).send('Unauthorized request');
    }else{
        next();
    }
});

const jwtUserAuth=async(req,res,next)=>{
    try{

        // read the token from the req cookies
        const cookies=req.cookies;
        const {token}=cookies;

        if(!token){
            throw new Error("Token is not valid");
        }

        // validate the token
        const decodedMessage=await jwt.verify(token,"ajsAhshr#1i@");
        const {id}=decodedMessage;
        
        // find the user
        const user=await User.findById(id);
        if(!user){
            throw new Error('Invalid Credentials');
        }

        req.user=user;
        next();   
    }catch(error){
        res.status(400).send('Error occured');
    }
};


module.exports={adminAuth,userAuth,jwtUserAuth};