import express from 'express'
import Order from '../models/order.model.js'

const router = express.Router()


router.post('/addorder',async(req,res)=>{
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