import mongoose from 'mongoose';

// Define the schema
const yupyupSchema = new mongoose.Schema({
  name: { type: String },  // No required
  number: { type: String },  // No required
  reference_number: { type: String },  // No required
  addingtime: { type: String },  // No required
  addingdate: { type: String },  // No required
  id: { type: Number },  // No required
  reference_name: { type: String, default: 'NA' },  // Default value for reference_name
  status: { type: String },  // No required
  did: { type: String },  // No required
  usingtime: { type: String },  // No required
  usingdate: { type: String },  // No required
  Discount_type: { type: String },  // No required
  cuid: { type: String }  // No required
}, {
  collection: 'freedish'  // Specify the existing collection name
});

// Create the model
const Freedish = mongoose.model('freedish', yupyupSchema);

// Export the model
export default Freedish;
