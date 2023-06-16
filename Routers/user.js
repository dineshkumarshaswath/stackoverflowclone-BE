import  express  from "express";
import bcrypt from 'bcrypt'
import { User }from '../dbmodels/user.js'
 import {generatejwttoken} from  '../dbmodels/user.js'

const router= express.Router();


router.post("/signup",async(req,res)=>{
     try {
        
        let user=await User.findOne({email:req.body.email})
    if(user){
        return  res.status(400).json({message:"user already existed"})
    }
    const salt= await bcrypt.genSalt(10);
    const hassedpassword=await bcrypt.hash(req.body.password,salt);
    
    user =await new User({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:hassedpassword

    }).save();
    //  return res.status(200).json({data:"successully added"})
     const token=generatejwttoken(user._id);
    return  res.status(201).json({message:"successfully logged in",token})



     } catch (error) {
         console.log('server error',error)
          res.status(500).json({message:'internal server error'})
     }
    


})

router.post("/login",async(req,res)=>{
   try {
    const user =await User.findOne({email:req.body.email})
    if(!user){
         return res.status(400).json({message:"invalid credentials"})
    }
    const validatepassword=await bcrypt.compare(
        req.body.password,
        user.password
    )
    if(!validatepassword){
        return res.status(400).json({message:'invalid credentials'})
    }
    
     const token=generatejwttoken(user._id)
    res.status(201).json({message:'successfully logged in ',token})

  


  } catch (error) {
    console.log('server error',error)
     res.status(500).json({message:'internal server error'})
    
    
   }
})


export const userRouter = router;