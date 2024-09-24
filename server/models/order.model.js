import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  number: {
    type: String,
    required: false
  },
  total_amount: {
    type: String,
    required: false
  },
  id: {
    type: String,
    required: false
  },
  payment_type: {
    type: String,
    required: false
  },
  biller_id: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  },
  time: {
    type: String,
    required: false
  },
  order_note: {
    type: String,
    required: false
  },
  product_status: {
    type: String,
    required: false
  },
  payment_status: {
    type: String,
    required: false
  },
  delivery_date: {
    type: String,
    required: false
  },
  order_id: {
    type: String,
    required: false
  },
  cuid: {
    type: String,
    required: false
  },
  products:{
    type: Array,
    required: false
  }
},
{
  timestamps: { currentTime: ()=> Date.now() },
    collection: 'order_data_short',
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
