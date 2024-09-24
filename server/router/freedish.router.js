import express from 'express'
import Freedish from '../models/freedish.model.js'
import Customer from '../models/customer.model.js'

const router = express.Router()


router.delete('/deletediscount',async(req,res)=>{
    console.log(req.body)
    const data = await Freedish.deleteOne({_id:req.body._id})
    res.json(data)
    console.log(data)
})

router.post('/adddiscount',async(req,res)=>{
    // const data = await Freedish.create(req.body)    
    // res.json(data)
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
    const data = await Freedish.create(req.body) 
    res.json(data)
})

router.put('/updatediscount',async(req,res)=>{
    const data = await Freedish.updateOne({_id:req.body._id},{$set: req.body})
    res.json(data)
})

// all data (Discountshow)
router.get('/getalldiscountdata',async(req,res)=>{
   setTimeout(async() => {
    const data = await Freedish.find()
    res.json(data)

   }, 0);

})

router.put('/updatediscount',async(req,res)=>{
  let  {_id} = req.body
  console.log("update is getting called",req.body)
  console.log("id",_id)
    // const id = req.params.did
    const data = await Freedish.updateOne({_id:_id},{$set: req.body})
    console.log(data)
    res.json(data)
})

router.get('/getdiscountdata',async(req,res)=>{
    const data = await Freedish.find({
        status: "notused"})
    res.json(data)

})

router.put('/usediscount/:id',async(req,res)=>{
    try {

        const id = req.params.id
    // const data = await YupyupModel.find({
    //     status: "notused"})
    var newDate = new Date();
    Date.prototype.today = function () { 
        return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
    }
    
    // For the time now
    Date.prototype.timenow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }
    const data = await Freedish.updateOne({_id:id},{$set: {status:"used",usingdate:newDate.today(),usingtime:newDate.timenow()}})
    // res.send(data)

    const data2 = await Freedish.find({
        status: "notused"})
    res.json(data2)
        
    } catch (error) {
        console.log(error)
    }

})


export default router;