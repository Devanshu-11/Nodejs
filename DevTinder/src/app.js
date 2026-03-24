const express=require('express');
const connectDB=require('./config/database.js');
const User=require('./models/user.js');
const app=express();

// it is used to parse incoming JSON data from the request body
app.use(express.json());

// add data in database
app.post('/signup',async(req,res)=>{

    // creating the instance of user model
    // const user=new User({
    //     firstName:'Virat',
    //     lastName:'Kohli',
    //     emailId:'ViratKohli18@gmail.com',
    //     password:'11223344',
    // });

    const user=new User(req.body);
    // console.log(req.body);

    try{
        await user.save();
        res.send('User added successfully');
    }catch(error){
        res.status(400).send('Error occured');
    }
});

// to fetch user via email
app.get('/user', async(req,res)=>{
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
app.patch('/user', async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    console.log(data);

    try{
        await User.findByIdAndUpdate({_id: userId}, data);
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