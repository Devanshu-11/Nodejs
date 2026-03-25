const {adminAuth, userAuth}=require('./middlewares/authMiddleware.js');
const express=require('express');
const app=express();

// Middleware is a type of function that executes between the client request and the server response and can process, modify or terminate or pass forward the request/response
// if we forgot to call next(), then process will hang indefinitely

// Route-specific middleware runs only on the specific route
// global middleware runs on every request regardless of the route
// app.use((req, res, next)=>{
//     console.log("Runs for every request");
//     next();
// });

// can also do that middleware runs on every get request
// app.get("*", (req, res, next) => {
//     console.log("This runs for every GET request");
//     next();
// });

// handle auth middleware for all the requests-GET, PUT, POST, DELETE, PATCH
app.use('/admin',adminAuth);

app.get('/user',userAuth,(req,res)=>{
    res.send('user data send');
});

app.get('/admin/getAllData',(req,res)=>{
    res.send('all data send');
});

app.get('/admin/deleteUser',(req,res)=>{
    res.send('Deleted a user');
})

// app.use('/',(req,res,next)=>{
//     res.send('Handling / routes');
//     next();
// })

// // it will shows error as it is sending two responses for the same request and also wrapping the routes inside the array is nothing to do with it
// app.get('/user',(req,res,next)=>{
//     console.log('Handling the route user-1');
//     res.send('Handling the route-1');
//     next();
// },(req,res,next)=>{

//     // not to be going to second response
//     console.log('Handling the route user-2');
//     res.send('Handling the route-2');
// });

// // Also can do in this way
// app.get('/user',(req,res,next)=>{
//     console.log('Handling the route user-1');
//     res.send('Handling the route-1');
//     next();
// });

// app.get('/user',(req,res,next)=>{
//     console.log('Handling the route user-2');
//     res.send('Handling the route-2');
//     next();
// });

app.listen(3000,()=>{
    console.log('Server is successfully listening on port 3000');
});