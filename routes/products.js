const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// get all products ****
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

//get product by id ****
router.get('/:id', async (req, res) => {
    
    const productID = req.params.id; 

    const parsedProductID = parseInt(productID);
    if (isNaN(parsedProductID)) {
        return res.status(400).json({ error: "Invalid product ID." });
    }

    try {
        // fetch product by product_id 
        const product = await Product.findOne({ product_id: parsedProductID }); 
        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }
        // return product as json response
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching product by ID." });
    }
});

// purchase product
router.post('/purchase', (req, res) => {
    // purchasing product functionality
});

module.exports = router;
