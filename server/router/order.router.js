import express from 'express'
import Order from '../models/order.model.js'
import Customer from '../models/customer.model.js'

const router = express.Router()

router.put('/updateorder',async(req,res)=>{

   
    const {id:_id,data} = req.body
   
    
    // console.log("from the backend",req.body)
    const updateddata = await Order.updateOne({_id},{$set:data})
    res.json(updateddata)
})


router.post('/addorder',async(req,res)=>{
    const updateddata = await Customer.findOne({number:req.body.number})
    console.log("updateddata",updateddata)
    if (!updateddata) {
        console.log("yup we need to add that")
        const data22 = await Customer.create(req.body)
        // const data22 = await Customer.create({name:req.body.name,number:req.body.number,email:req.body.email})
    }
   else{
      const updateddata = await Customer.updateMany({number:req.body.number},{$set:req.body})
        // const data22 = await Customer.create({name:req.body.name,number:req.body.number,email:req.body.email})
    }
    const data = await Order.create(req.body)
    res.json(data)
    
   
})

// all data (Discountshow)
router.get('/getallorder',async(req,res)=>{
   setTimeout(async() => {
    console.log("orders are getting called")
    const data = await Order.find()
    res.json(data)
    // console.log(data)

   }, 0);

})

router.get('/getorderdata',async(req,res)=>{
    const data = await Order.find({
        status: "notused"})
    res.json(data)

})



export default router;