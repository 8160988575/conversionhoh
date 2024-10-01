import express, { Router } from 'express'
import Customerreq from '../models/register.model.js'

let router = express.Router()

router.get('/gethohrequest',async (req,res)=>{

    const data = await Customerreq.find()    
    res.json(data)


})



router.post('/addrequest',async (req,res)=>{
    console.log("from the backend",req.body.username)
    // console.log()

    const updateddata = await Customerreq.findOne({number:req.body.username})
    console.log("updateddata",updateddata)
    if (!updateddata) {
        const {
            name ,username:number,businessName:businessname,businessAddress:address,referredBy:reffered_by,password,email} = req.body
    
        const yup ={
            name,number,email,businessname,address,reffered_by,password
        } 
        const data = await Customerreq.create(yup)
    
         res.json(data)
    
    }
   else{
    res.status(500).json({
        success: false,
        message: 'User already exists!',
      });
    }

   
})




export default router;