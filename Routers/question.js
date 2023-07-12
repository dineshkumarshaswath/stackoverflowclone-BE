import express from 'express'

import { Question } from '../dbmodels/question.js';


const router=express.Router();

router.get("/questionall",async (req,res)=>{
    const questions= await Question.find().populate("user","id name")
  return  res.status(200).json({message:"get all datas",questions})
})

router.post("/postquestion", async(req,res)=>{
    try {

        const posteddate=new Date().toJSON().slice(0,10);
        const question =await new Question({
            ...req.body,firstName: req.user.name, date:posteddate,user:req.user._id
        }).save()
        return res.status(201).json({message:"successfully added",question})
        
    } catch (error) {
     console.log('server error',error)
     return  res.status(500).json({message:'internal server error'})
    }
})

router.put("/edit/:id",async(req,res)=>{
    try {
        let updatequestions= await Question.findOneAndUpdate({
            _id:req.params.id},
            {$set:req.body},{
                new:true})
    if(!updatequestions){
        return res.status(400).json({message:"error occured"})
    }
   return  res.status(201).json({message:'successfully updated'})
        
    } catch ( error) {
        console.log('server error',error)
     return  res.status(500).json({message:'internal server error'})
        
    }

})

router.delete("/delete/:id",async(req,res)=>{
    try {
        let deletequestions=await Question.findByIdAndDelete(
            {_id:req.params.id})
            if(!deletequestions){
                return res.status(400).json({message:"error occured"})
            }
           return  res.status(201).json({message:'successfully deleted'})

        
    } catch (error) {
        console.log('server error',error)
        return  res.status(500).json({message:'internal server error'})
        
    }

})



router.get("/userquestion",async(req,res)=>{
    try {
         const userquestion= await Question.find({user:req.user._id})
     return res.status(200).json({message:"succeffuly got questions",userquestion})
     
    } catch (error) {
     console.log('server error',error)
     return  res.status(500).json({message:'internal server error'})  
    }
  })

  export const questionRouter=router