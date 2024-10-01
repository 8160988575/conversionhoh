import express, { request } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import discountRoute from './router/freedish.router.js'
import orderRoute from './router/order.router.js'
import customerRoute from './router/customer.router.js'
import requestRoute from './router/register.router.js'

dotenv.config()
const app = express()
app.use(express.json())
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5000']


   // Whitelist the domains you want to allow
};
app.use(cors(corsOptions))

mongoose.connect("mongodb://127.0.0.1:27017/userbase").then(()=>{
    console.log("connected to mongoDB")
})



app.use('/discount',discountRoute);
app.use('/order',orderRoute);
app.use('/customer',customerRoute);
app.use('/request',requestRoute);




app.listen(process.env.PORT,()=>{
    console.log("hi at the port:",process.env.PORT)
})


