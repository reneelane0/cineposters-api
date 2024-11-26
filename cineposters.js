const express = require('express');
const mongoose = require('mongoose'); // ****
const app = express();
const path = require('path'); // handling file paths ****

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/cineposters', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Failedto connect to MongoDB:', err));
    

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse url encoded data ****
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