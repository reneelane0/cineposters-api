const express = require('express');
const app = express();
const path = require('path'); // compatibility with file paths ****

// middleware
app.use(express.json());
// allows static image files ****
app.use('/images', express.static(path.join(__dirname, 'public/images'))); 

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