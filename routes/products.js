const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// get all products
router.get('/all', async (req, res) => {
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
