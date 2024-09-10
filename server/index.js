import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import YupyupModel from './models/yupyup.model.js'


dotenv.config()
const app = express()
app.use(express.json())
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5000']


   // Whitelist the domains you want to allow
};
app.use(cors(corsOptions))
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

mongoose.connect("mongodb://127.0.0.1:27017/userbase").then(()=>{
    console.log("connected to mongoDB")
})

app.get('/m',async(req,res)=>{
    const data = await YupyupModel.find()
    res.json(data)

})

app.get('/getdiscountdata',async(req,res)=>{
    const data = await YupyupModel.find({
        status: "notused"})
    res.json(data)

})


app.put('/usediscount/:id',async(req,res)=>{
    const id = req.params.id
    // const data = await YupyupModel.find({
    //     status: "notused"})
    const data = await YupyupModel.updateOne({_id:id},{$set: {status:"used"}})
    // res.send(data)

    const data2 = await YupyupModel.find({
        status: "notused"})
    res.json(data2)

})


app.listen(process.env.PORT,()=>{
    console.log("hi at the port:",process.env.PORT)
})


