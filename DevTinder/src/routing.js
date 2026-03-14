const express=require('express');

// creating an instance of Expressjs application
const app=express();

// app.use() matches all HTTP methods (GET, POST, PUT, DELETE etc)
// app.get(), app.post(), app.put() handle only their specific HTTP request types
app.get("/",(req,res)=>{
    res.send('Hello from the dashboard');
});

app.get("/user",(req,res)=>{

    // to read the query parameters
    console.log(req.query);
    res.send({
        firstName: 'Devanshu',
        lastName: 'Kansal'
    });
});

app.get("/user/:userId",(req,res)=>{

    console.log(req.params);
    res.send({
        firstName: 'Devanshu',
        lastName: 'Kansal'
    });
});

// regex is a pattern used to match text
// ?- either take that char or not 
// *- 0 or more times add that char 
// +- 1 or more times add that char 
app.get(/us?er/,(req,res)=>{
    res.send({
        firstName: 'Namaste',
        lastName: 'Nodejs'
    });
});

app.post("/user",(req,res)=>{
    console.log('Save data to the database');
    res.send('Data successfully save to the database');
});

app.delete("/user",(req,res)=>{
    res.send('Deleted successfully');
});

app.get("/hello",(req,res)=>{
    res.send('Hello from the server');
});

app.get("/test",(req,res)=>{
    res.send('test from the server');
});

// listening to the server
app.listen(3000,()=>{
    console.log('Server is successfully listening on port 3000');
});