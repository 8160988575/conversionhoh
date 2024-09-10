import mongoose from 'mongoose'

const ConnecttoDatabase = () => {
   
    mongoose.connect("mongodb://127.0.0.1:27017/userbase").then(()=>{
        console.log("connected to mongoDB")
    })

}