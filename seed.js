const mongoose = require('mongoose');
const Product = require('./models/product');

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/cineposters');
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.error('Error connecting to MongoDB: ', err);
        return;
    }

    // product data
    const products = [
        { product_id: 1, name: 'Princess Mononoke (1997)', description: '24\" x 36\"', cost: 24.00, image_filename: 'pic1.jpg' },
        { product_id: 2, name: 'Barbie (2023)', description: '18\" x 27\"', cost: 15.00, image_filename: 'pic2.jpg' },
        { product_id: 3, name: 'Spider-Man: Into the Spider-Verse (2018)', description: '27\" x 40\"', cost: 28.00, image_filename: 'pic3.jpg' },
        { product_id: 4, name: 'Midsommar (2019)', description: '24\" x 36\"', cost: 24.00, image_filename: 'pic4.jpg' },
        { product_id: 5, name: 'Eternal Sunshine of the Spotless Mind (2004)', description: '18\" x 27\"', cost: 15.00, image_filename: 'pic5.jpg' },
        { product_id: 6, name: 'The Florida Project (2017)', description: '27\" x 40\"', cost: 28.00, image_filename: 'pic6.jpg' },
        { product_id: 7, name: 'La La Land (2016)', description: '24\" x 36\"', cost: 24.00, image_filename: 'pic7.jpg' },
        { product_id: 8, name: 'The Shining (1980)', description: '18\" x 27\"', cost: 15.00, image_filename: 'pic8.jpg' },
        { product_id: 9, name: 'American Psycho (2000)', description: '27\" x 40\"', cost: 28.00, image_filename: 'pic9.jpg' },
        { product_id: 10, name: 'The Silence of the Lambs (1991)', description: '24\" x 36\"', cost: 24.00, image_filename: 'pic10.jpg' },
    ];

    // enter products to db
    try {
        await Product.insertMany(products);
        console.log('Products added successfully!');
    } catch (error) {
        console.error('Error adding products: ', error);
    } finally {
        mongoose.disconnect();
    }
}

main();