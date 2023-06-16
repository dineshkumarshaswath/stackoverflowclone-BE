import mongoose from "mongoose";

export function dbConnection(){
    const params={
        useNewUrlParser:true,
        UseUnifiedTopology:true,
    }

    try {
        mongoose.connect("mongodb+srv://dinesh:dinesh13@cluster0.fugkgn1.mongodb.net/dbdetails",params)
        console.log("db connected successfully")
        
    } catch (error) {
        console.log('error connerctio db',error)
    }
}