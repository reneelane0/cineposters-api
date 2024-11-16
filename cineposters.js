const express = require('express');
const app = express();

// middleware
app.use(express.json());

// routes
const users = require('./routes/users');
const products = require('./routes/products');

// use routes
app.use('/users', users);
app.use('/products', products);

// start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});