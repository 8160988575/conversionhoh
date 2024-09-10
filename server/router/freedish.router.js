import express from 'express'
import Freedish from '../models/freedish.model.js'

const router = express.Router()


router.post('/adddiscount',async(req,res)=>{
    const data = await Freedish.create(req.body)
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