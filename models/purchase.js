const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  purchase_id: { type: Number, required: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // reference user model
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String, required: true },
  credit_card: { type: String, required: true },
  credit_expire: { type: Date, required: true },
  credit_cvv: { type: String, required: true },
  invoice_amt: { type: Number, required: true },
  invoice_tax: { type: Number, required: true },
  invoice_total: { type: Number, required: true },
  order_date: { type: Date, required: true },
});

module.exports = mongoose.model('Purchase', purchaseSchema);
