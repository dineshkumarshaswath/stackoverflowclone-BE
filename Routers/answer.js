import express from 'express'
import {Answer} from '../dbmodels/answer.js'

const router=express.Router()

router.get("/answerall",async(req,res)=>{
         try {
            
            const answers= await Answer.find().populate("user","id name")
            return  res.status(200).json({message:"get all datas",answers})
            
         } catch (error) {
            console.log('server error',error)
            return  res.status(500).json({message:'internal server error'})
           
            
         }
   
     
})


router.post("/postanswer",async (req,res)=>{
    try {
        const posteddate=new Date().toJSON().slice(0,10);
        const newanswer=await new Answer({
            ...req.body,user:req.user._id,firstName:req.user.name,date:posteddate
        }).save()
        return res.status(201).json({message:"successfully added",newanswer})
        
    } catch (error) {
        
        console.log('server error',error)
            return  res.status(500).json({message:'internal server error'})
    }
})

 router.put("/ansedit/:id",async(req,res)=>{
            try {
                const updateanswers= await Answer.findByIdAndUpdate(
                    {_id:req.params.id},{$set:req.body},{new:true}
            )
                return res.status(201).json({message:"successfully updated",updateanswers}) 
                
            } catch (error) {
                console.log('server error',error)
            return  res.status(500).json({message:'internal server error'})
            }
 })

 router.delete("/ansdelete/:id",async(req,res)=>{
    try {
        const deleteone= await Answer.findByIdAndDelete({
            _id:req.params.id
        })
        return res.status(201).json({message:"successfully deleted"}) 
        
    } catch (error) {
        console.log('server error',error)
        return  res.status(500).json({message:'internal server error'})  
    }
   

 })

 router.get("/useranswer",async(req,res)=>{
   try {
        const useranswer= await Answer.find({user:req.user._id})
    return res.status(200).json({message:"succeffuly got answers",data:useranswer})
    
   } catch (error) {
    console.log('server error',error)
    return  res.status(500).json({message:'internal server error'})  
   }
 })
    
 export const answerRouter = router