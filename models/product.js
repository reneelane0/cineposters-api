const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    image_filename: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;