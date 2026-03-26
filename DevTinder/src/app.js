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

// add data in database
app.post('/signup',async(req,res)=>{
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
app.post('/login',async(req,res)=>{

    try{
        const {emailId,password}=req.body;
        if(!emailId||!password){
            throw new Error('Invalid Credentials');
        }

        // to check if emailId is present
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error('Invalid Credentials');
        }

        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            // create a jwt token
            const token=jwt.sign({id: user._id},"ajsAhshr#1i@",{expiresIn:"1d"});

            // Add a token to cookie and send the response back to user
            res.cookie("token",token, {expires: new Date(Date.now()+24*60*60*1000)});
            res.send('User Login successful');
        }else{
            throw new Error('Invalid Credentials');
        }
    }catch(error){
        res.status(400).send('Error occured');
    }
});

// to get the profile of the user
app.get('/profile',jwtUserAuth,async(req,res)=>{

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

app.post('/sendConnectionRequest',jwtUserAuth,async(req,res)=>{

    // sending a connection request
    res.send('Send a connection request');

});

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