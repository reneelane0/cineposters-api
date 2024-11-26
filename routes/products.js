const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
router.get('/:id', (req, res) => {
    const productID = ParseInt(req.params.id); // convert id from string to int
    if (isNaN(productID)) {
        return res.status(400).json({ error: "Invalid product ID. "});
    }
    try {
        // fetch product if found
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
