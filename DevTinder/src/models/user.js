const mongoose=require('mongoose');
const validator=require('validator');

// creating the user schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        minLength:2,
        maxLength:50,
        required:true,
    },
    lastName:{
        type:String,
        minLength:2,
        maxLength:50,
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email Address');
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
        max:50,
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error('Gender Data is not Valid');
            }
        }
    },
    photoURL:{
        type:String,
    },
    about:{
        type:String,
        default:'This is default description of user',
    },
    skills:{
        type:[String],
    }
},{
    timestamps:true,
});

// creating a model
const User=mongoose.model('User',userSchema);
module.exports=User;