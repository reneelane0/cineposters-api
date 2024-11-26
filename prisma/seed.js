const mongoose = rewquire('mongoose');
const Product = require('./models/product');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/cineposters')
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB: ', err);
    });


async function main() {
    // product data
    const products = [
        { name: 'Princess Mononoke (1997)', description: '24\" x 36\"', cost: 24.00, image_filename: 'pic1.jpg' },
        { name: 'Barbie (2023)', description: '18\" x 27\"', cost: 15.00, image_filename: 'pic2.jpg' },
        { name: 'Spider-Man: Into the Spider-Verse (2018)', description: '27\" x 40\"', cost: 28.00, image_filename: 'pic3.jpg' },
        { name: 'Midsommar (2019)', description: '24\" x 36\"', cost: 24.00, image_filename: 'pic4.jpg' },
        { name: 'Eternal Sunshine of the Spotless Mind (2004)', description: '18\" x 27\"', cost: 15.00, image_filename: 'pic5.jpg' },
        { name: 'The Florida Project (2017)', description: '27\" x 40\"', cost: 28.00, image_filename: 'pic6.jpg' },
        { name: 'La La Land (2016)', description: '24\" x 36\"', cost: 24.00, image_filename: 'pic7.jpg' },
        { name: 'The Shining (1980)', description: '18\" x 27\"', cost: 15.00, image_filename: 'pic8.jpg' },
        { name: 'American Psycho (2000)', description: '27\" x 40\"', cost: 28.00, image_filename: 'pic9.jpg' },
        { name: 'The Silence of the Lambs (1991)', description: '24\" x 36\"', cost: 24.00, image_filename: 'pic10.jpg' },
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