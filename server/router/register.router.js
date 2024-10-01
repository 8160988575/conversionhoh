import express, { Router } from 'express'
import Customerreq from '../models/register.model.js'

let router = express.Router()

router.get('/gethohrequest',async (req,res)=>{

    const data = await Customerreq.find()    
    res.json(data)


})



router.post('/addrequest',async (req,res)=>{

    const {
        name ,username:number,businessName:businessname,businessAddress:address,referredBy:reffered_by,password,email} = req.body

    const yup ={
        name,number,email,businessname,address,reffered_by,password
    } 
    const data = await Customerreq.create(yup)

     res.json(data)

})




export default router;