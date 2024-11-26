const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// product schema definition
const productSchema = new mongoose.Schema({
    product_id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    image_filename: { type: String, required: true }
});

// create product model
const Product = mongoose.model('Product', productSchema);

// get all products
router.get('/all', async (req, res) => {
    try {
        // fetch all products
        const products = await Product.find();
        // send back array of products
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting all products. "});
    }
});

//get products by id
router.get('/:id', (req, res) => {
    // fetching products functionality
});

// purchase product
router.post('/purchase', (req, res) => {
    // purchasing product functionality
});

module.exports = router;
