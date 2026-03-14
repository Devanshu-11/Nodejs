const express=require('express');
const app=express();

app.get('/getUserData',(req,res)=>{
    // can also do the try and catch error
    try{
        // random error is thrown
        throw new Error('Error is shown');

        // Logic of DB call and get user Data
        res.send('User data send');
    }catch(err){
        res.status(500).send('Something went wrong');
    }
});

// if i am adding the error, it should always be 1st parameter
app.use('/',(err,req,res,next)=>{
    if(err){
        // Also can log the error messages
        res.status(500).send('Something went wrong');
    }
});

app.listen(3000,()=>{
    console.log('Server is successfully listening on port 3000');
});