const validator=require('validator');

const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;

    // Write different validations
    if(!firstName||!lastName){
        throw new Error('Name is not valid');
    }

    if(!emailId){
        throw new Error('Email is required');
    }

    if(!password){
        throw new Error('Password is required');
    }

    if(firstName.length<4||firstName.length>50){
        throw new Error('First Name should be between 4 to 50 characters');
    }

    if(!validator.isEmail(emailId)){
        throw new Error('Email is not valid');
    }

    if(!validator.isStrongPassword(password)){
        throw new Error('Please enter the strong password');
    }
}

const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","age","gender","photoURL","about","skills"];

    // to check that all fields sent in the request body are allowed fields
    const isEditAllowed=Object.keys(req.body).every(field=>allowedEditFields.includes(field));
    return isEditAllowed;
}

module.exports={validateSignUpData,validateEditProfileData};