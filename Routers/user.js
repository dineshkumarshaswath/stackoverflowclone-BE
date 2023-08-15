import  express  from "express";
import bcrypt from 'bcrypt'
import { User }from '../dbmodels/user.js'
 import {generatejwttoken} from  '../dbmodels/user.js'
import { sendMail } from "../Controls/auth.js";
import crypto from "crypto"

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
         return res.status(500).json({message:'internal server error'})
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
      return  res.status(201).json({message:'successfully logged in ',token})

  


  } catch (error) {
    console.log('server error',error)
      return  res.status(500).json({message:'internal server error'})
    
    
   }
})

router.post("/forgot",async(req,res)=>{
    try {
      
        const user = await User.findOne({email:req.body.email})
        if (!user) {
          return res.status(404).json({ error: "invalid crenditials" });
        }
    
   //this is the function for the reset token
        const resetToken = user.getResetToken();
        await user.save({validateBeforeSave:false})
        
        const resetUrl = `https://stackoverclonetask.netlify.app/reset/password/${resetToken}`;
  //send the reseturl
  
        const message = `Your password reset url is as follows \n\n 
        ${resetUrl} \n\n If you have not requested this email, then ignore it.`;
        await user.save();
  //send the mail with nodemailer package
  
        sendMail({  email: user.email, subject: "Reset the password",  message})
  
         return res.status(200).json({ message: `Email sent to ${user.email}`
      })
  
      //here is the catching the error field
      } catch (error) {
        console.error('server error', error);
         return res.status(500).json({ message: 'Internal server error' });
      }

})

router.post("/reset/password/:token",async(req,res)=>{
    const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 
    try {

//here is the find the user details with token

      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'Invalid or expired token' });
      }
      
      if( req.body.password !== req.body.confirmPassword) {
        return res.status(404).json({ error: 'Password does not match' });
      }
     
//here is the hash the new password
      const salt= await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    
      user.password = hashedPassword; 
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;
// here is the save the reset password and the token field

      await user.save(); 
// this is the send the token to the user

      const token = generatejwttoken(user._id)
         return res.status(200).json({  message:" successfully reset the password" })
    } catch (error) {
      console.error('server error', error);
       return res.status(500).json({ error: 'Internal server error' });
    }
  })



export const userRouter = router;