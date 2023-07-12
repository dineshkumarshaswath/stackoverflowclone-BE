import mongoose from "mongoose";

export function dbConnection(){
    const params={
        useNewUrlParser:true,
        UseUnifiedTopology:true,
    }

    try {
        mongoose.connect("mongodb+srv://dineshkumar:dineshkumar@cluster0.c2ogjte.mongodb.net/stackoverclone",params)
        console.log("db connected successfully")
        
    } catch (error) {
        console.log('error connerctio db',error)
    }
}