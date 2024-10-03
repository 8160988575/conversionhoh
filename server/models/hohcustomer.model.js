import mongoose from 'mongoose';

const hohcustomerSchema = new mongoose.Schema({
  id: {
    type: String,
    // required: true
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

  email: {
    type: String,
    required: true
  }
}, { collection: 'hoh_customer',timestamps: { createdAt: 'add_date', updatedAt: 'update_date' } });

const hohcustomer = mongoose.model('hohcustomerSchema', hohcustomerSchema);

export default hohcustomer;