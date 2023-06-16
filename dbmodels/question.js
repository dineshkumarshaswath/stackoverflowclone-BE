import mongoose from "mongoose";


const {ObjectId}=mongoose.Schema
 const questionsSchema= new mongoose.Schema({
    
    firstName:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true,
    },
    keywords:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:'user'
    }
 }
 )
 const Question= mongoose.model('question',questionsSchema)
 export {Question}
 