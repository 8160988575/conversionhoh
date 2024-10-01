import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d+$/.test(v); // Ensures username is numeric
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  businessname: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  referred_by: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
  },
  email: {
    type: String,
  },
  customer_adding_date: {
    type: String,
  },
  approvation_date: {
    type: String,
  }
}, {
  collection: 'hoh_customer_request',
  timestamps: true
});

const Customerreq = mongoose.model('Customerreq', UserSchema);
export default Customerreq;
