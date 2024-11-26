const express = require('express');
const mongoose = require('mongoose');
const Purchase = require('../models/purchase');
const PurchaseItem = require('../models/purchaseItem');
const router = express.Router();

// post route for creating a purchase
router.post('/purchase', async (req, res) => {
    // make sure user is logged in
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const { street, city, province, country, postal_code, credit_card, credit_expire, credit_cvv, cart, invoice_amt, invoice_tax, invoice_total } = req.body;

    try {
        // create purchase record
        const purchase = new Purchase({
            customer_id: req.user._id,
            street,
            city,
            province,
            country,
            postal_code,
            credit_card,
            credit_expire,
            credit_cvv,
            invoice_amt,
            invoice_tax,
            invoice_total,
            order_date: new Date()
        });

        // save purchase record
        const savedPurchase = await purchase.save();

        // process cart
        const productIds = cart.split(',').map(id => mongoose.Types.ObjectId(id));

        // create purchase items from cart
        const purchaseItems = productIds.map(product_id => ({
            purchase_id: savedPurchase._id,
            product_id: product_id,
            quantity: productIds.filter(id => id.toString() === product_id.toString()).length // count occurences of each product

        }));

        // save purchase items in db
        await PurchaseItem.insertMany(purchaseItems);

        // success response
        res.status(201).json({ message: 'Purchase completed sucessfully!', purchase: savedPurchase });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing purchase.' });
    }
});

module.exports = router;