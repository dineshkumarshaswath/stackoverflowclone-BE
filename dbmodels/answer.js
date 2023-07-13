import mongoose from 'mongoose'

const {ObjectId}=mongoose.Schema
 
const answerSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },

    answer:{
        type:String,
        required:true
    },
    keywords:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        required:true,
        ref:"user"
    }
    

})

const Answer=mongoose.model("answers",answerSchema)
export {Answer}