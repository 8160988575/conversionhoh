import express, { Router } from 'express'
import Customerreq from '../models/register.model.js'
import hohcustomer from '../models/hohcustomer.model.js'

let router = express.Router()

router.get('/gethohrequest',async (req,res)=>{

    const data = await Customerreq.find()    
    res.json(data)

})


router.put('/approverequest',async (req,res)=>{

const updateData = { ...req.body, status: 'approved' }; // Merge req.body with status 'approved'
const updatedyup = await Customerreq.updateOne({number:req.body.number},{$set:updateData})
console.log("updating this",req.body.number)
console.log(updatedyup)
// res.json(updatedyup)

if (updatedyup.matchedCount === 0) {
    // No document matched the query    
    return res.status(404).json({ message: 'No matching document found' });
  }

  if (updatedyup.modifiedCount === 0) {
    // Document was found, but nothing was updated (i.e., data is already the same)
    return res.status(200).json({ message: 'Document already updated', updatedyup });
  }
  // Update was successful  
  
  const hohadding = hohcustomer.create({...updateData,cuid:Math.floor(Math.random()*10000000000)})

  res.status(200).json({ message: 'Update successful', updatedyup });

})




router.post('/addrequest',async (req,res)=>{
    console.log("from the backend",req.body.username)
    // console.log()
     
    const alreadyapprovedcustomer = await hohcustomer.findOne({number:req.body.username})
    if (alreadyapprovedcustomer) {

        res.status(400).json({
            success: false,
            message: 'Already Approved Customer Please Login!',
          });
        
    }

    const alreadyrerequestedcustomer = await Customerreq.findOne({number:req.body.username})
   if (alreadyrerequestedcustomer) {
    res.status(500).json({
        success: false,
        message: 'User Applied wait for approval , in Emergency Contact our team!',
      });
   }
  

    console.log("updateddata",updateddata)
    if (!alreadyrerequestedcustomer && !alreadyapprovedcustomer) {
        const {
            name ,username:number,businessName:businessname,businessAddress:address,referredBy:reffered_by,password,email} = req.body
    
        const yup ={
            name,number,email,businessname,address,reffered_by,password
        } 
        const data = await Customerreq.create(yup)
    
         res.json(data)
    
    }
   
})




export default router;