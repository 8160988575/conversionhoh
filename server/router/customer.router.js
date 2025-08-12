import express, { Router } from 'express'
import Customer from '../models/customer.model.js'

let router = express.Router()

router.get('/getcustomers',async (req,res)=>{

    const data = await Customer.find()    
    res.json(data)


})




router.post('/addcustomer',async (req,res)=>{

    const {
        name ,number,email,age,status:state,address,personal_note,cuid
    } = req.body

    const yup ={
        name,number,email,age,state,address,personal_note,cuid
    } 
    const data = await Customer.create(yup)

     res.json(data)

})

// Older way for adding User
// const newUser = new User({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     password: 'hashedpassword'
//   });
  
//   newUser.save()
//     .then(user => console.log(user))
//     .catch(err => console.error(err));



router.put('/updatecustomer',async(req,res)=>{
    
   const yup =await Customer.updateOne({_id:req.body._id},{$set:req.body})
     res.json(yup)

})


router.delete('/deletecustomer/:id',async(req,res)=>{
    const {id} = req.params
    console.log(id)
    
    const yup =await Customer.deleteOne({_id:id})
       console.log("i am at the backend of delete",yup)
      res.json(yup)
 
 })
 

export default router;