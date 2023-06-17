 
import { dbConnection } from "./db.js";
import express from 'express'
import cors from 'cors'
import { userRouter } from "./Routers/user.js";
import { questionRouter } from "./Routers/question.js"
import { isAuthenticated } from "./controls/auth.js";
import dontenv from 'dotenv'




 const app= express()
 
 dontenv.config()
 const PORT=process.env.PORT

  
 app.use(express.json())
 app.use(cors())

 
dbConnection();

app.get("/",(req,res)=>{
     return res.send('server condition working fine')
})
app.use("/api",userRouter)
app.use("/api",isAuthenticated,questionRouter)






app.listen(PORT,()=>console.log(`server connected localhost:${PORT}`))

