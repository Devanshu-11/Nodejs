const express=require('express');
const connectDB=require('./config/database.js');
const User=require('./models/user.js');
const app=express();

// add data in database
app.post('/signup',async(req,res)=>{

    // creating the instance of user model
    const user=new User({
        firstName:'Virat',
        lastName:'Kohli',
        emailId:'ViratKohli18@gmail.com',
        password:'11223344',
    })

    try{
        await user.save();
        res.send('User added successfully');
    }catch(error){
        res.status(400).send('Error occured');
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