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


module.exports={adminAuth,userAuth};