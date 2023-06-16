import mongoose from "mongoose";
import jwt from "jsonwebtoken"


const userSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxlength:20,
        trim:true
    },
    email:{
        type:String,
        required:true, 
       unique:true,
       trim:true,
    },
    contact:{
        type:String,

    },
    password:{
        type:String,
        required:true
    }

})

  function generatejwttoken(id){
      return jwt.sign({id},process.env.SECRET_KEY);

  }


const User=mongoose.model("user",userSchema);
export  {User,generatejwttoken}