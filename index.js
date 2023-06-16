 
import { dbConnection } from "./db.js";
// import { User } from "./dbmodels/user.js";
// import { Question } from "./dbmodels/question.js";
import express from 'express'
import cors from 'cors'
import { userRouter } from "./Routers/user.js";
import { questionRouter } from "./Routers/question.js"
import { isAuthenticated } from "./controls/auth.js";




 const app= express()
 

  
 app.use(express.json())
 app.use(cors())

 
dbConnection();


app.use("/api",userRouter)
app.use("/api",isAuthenticated,questionRouter)






app.listen(7000,()=>console.log(`server connected localhost:7000`))

