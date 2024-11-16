const express = require('express');
const router = express.Router();

// get all products
router.get('/all', (req, res) => {
    // fetching products functionality
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
