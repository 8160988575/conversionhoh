import express, { Router } from 'express'
import Customer from '../models/customer.model.js'

let router = express.Router()

router.get('/getcustomers',async (req,res)=>{

    const data = await Customer.find()    
    res.json(data)


})


export default router;