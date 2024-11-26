const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
    purchase_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Purchase', required: true }, // reference purchase model
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // reference product model
    quantity: { type: Number, required: true }
});

// composite unique key
purchaseItemSchema.index({ purchase_id: 1, product_id: 1 }, { unique: true }); 

module.exports = mongoose.model('PurchaseItem', purchaseItemSchema);