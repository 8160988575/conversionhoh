import mongoose from 'mongoose';

const hohcustomerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  cuid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  businessname: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  customer_approvation_date: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, { collection: 'hoh_customer' });

const hohcustomer = mongoose.model('hohcustomerSchema', hohcustomerSchema);

export default hohcustomer;