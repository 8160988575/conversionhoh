import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({

    name:{type:String,requied:false},
    number:{type:String,requied:false},
    email:{type:String,requied:false},
    cuid:{type:String,requied:false},
    grade:{type:String,requied:false},
    averageage:{type:String,requied:false}

},
{collection:"short_user"});


const Customer = mongoose.model('Customer',CustomerSchema)
export default Customer;