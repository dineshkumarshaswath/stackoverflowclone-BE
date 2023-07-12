 
import { dbConnection } from "./db.js";
import express from 'express'
import cors from 'cors'
import { userRouter } from "./Routers/user.js";
import { questionRouter } from "./Routers/question.js"
import { isAuthenticated } from "./Controls/auth.js";
import dontenv from 'dotenv'
import { answerRouter } from "./Routers/answer.js";




 const app= express()
 
 dontenv.config()
 const PORT=process.env.PORT

  
 app.use(express.json())
 app.use(cors())

 
dbConnection();

app.get("/",(req,res)=>{
     return res.send('server condition  fine')
})

app.use("/api",userRouter)
app.use("/api",isAuthenticated,questionRouter)
app.use("/api",isAuthenticated,answerRouter)





app.listen(PORT,()=>console.log(`server connected localhost:${PORT}`))

