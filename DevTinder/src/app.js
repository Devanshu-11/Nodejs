const express=require('express');
const connectDB=require('./config/database.js');
const cookieParser=require('cookie-parser')
const jwt=require('jsonwebtoken');
const User=require('./models/user.js');
const {validateSignUpData}=require('./utils/validation.js');
const bcrypt=require('bcrypt');
const {jwtUserAuth}=require('./middlewares/authMiddleware.js');
const app=express();

// it is used to parse incoming JSON data from the request body
app.use(express.json());

// add cookie parser middleware
app.use(cookieParser());

// to import all routers
const authRouter=require('./routes/auth.js');
const profileRouter=require('./routes/profile.js');
const requestRouter=require('./routes/request.js');
const userRouter=require('./routes/user.js');
const paymentRouter=require('./routes/payment.js');

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);
app.use('/',paymentRouter);

// to fetch user via email
app.get('/user',jwtUserAuth,async(req,res)=>{
    const userEmail=req.body.emailId;

    try{
        // to find user
        const users=await User.find({emailId:userEmail});
        if(users.length===0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(error){
        res.status(400).send("Something Went Wrong");
    }
});

// if we want to fetch all the users
app.get('/feed', async(req,res)=>{

    try{
        // it gets all documents from the collections and send it back
        const users=await User.find({});
        res.send(users);
    }catch(error){
        res.status(400).send("Something Went Wrong");
    }
});

// to delete the particular user from the database
app.delete('/user', async(req,res)=>{
    const userId=req.body.userId;

    try{
        const user=await User.findByIdAndDelete(userId);
        res.send('User deleted successfully');
    }catch(error){
        res.status(400).send("Something Went Wrong");
    }
});

// to update the data of particular user
app.patch('/user/:userId', async(req,res)=>{
    // if i am taking from body
    // const userId=req.body.userId;

    // if i am taking from params
    const userId=req.params?.userId; 
    const data=req.body;

    try{
        const allowed_updates=["userId","photoURL","about","gender","age","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>allowed_updates.includes(k));
        
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }

        if(data?.skills.length>10){
            throw new Error('Skills cannot be more than 10');
        }

        await User.findByIdAndUpdate({_id: userId}, data,{
            runValidators:true,
        });
        res.send('User Updated Successfully');
    }catch(error){
        res.status(400).send("Something Went Wrong");
    }
});

connectDB().then(()=>{
    console.log('Database connection established');

    // once i am connected to database, then we will be listening to the server
    app.listen(3000,()=>{
        console.log('Server is successfully listening on port 3000');
    });

}).catch((err)=>{
    console.log(err);
});