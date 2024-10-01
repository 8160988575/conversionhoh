const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
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
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  businessAddress: {
    type: String,
    required: true,
    trim: true
  },
  referredBy: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  collection: 'hoh_customer_request',
  timestamps: true
});

const Customerreq = mongoose.model('Customerreq', UserSchema);
export default Customerreq;
