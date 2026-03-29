const express=require('express');
const {jwtUserAuth}=require('../middlewares/authMiddleware.js');
const requestRouter=express.Router();

requestRouter.post('/sendConnectionRequest',jwtUserAuth,async(req,res)=>{
    // sending a connection request
    res.send('Send a connection request');

});

module.exports=requestRouter;