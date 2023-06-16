 
import { dbConnection } from "./db.js";
// import { User } from "./dbmodels/user.js";
// import { Question } from "./dbmodels/question.js";
import express from 'express'
import cors from 'cors'
import { userRouter } from "./Routers/user.js";
import { questionRouter } from "./Routers/question.js"
import { isAuthenticated } from "./controls/auth.js";
import dotenv from 'dotenv'

  dotenv.config()

 const app= express()
  const PORT=process.env.PORT
  
 app.use(express.json())
 app.use(cors())

 
dbConnection();
app.get("/",(req,res)=>{
    res.send("working fine")
})

app.use("/user",userRouter)
app.use("/api",isAuthenticated,questionRouter)






app.listen(PORT,()=>console.log(`server connected localhost:${PORT}`))

