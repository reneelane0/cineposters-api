const mongoose = require('mongoose');
const Purchase = require('./models/purchase');
const PurchaseItem = require('./models/purchaseItem');

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // check if collections already exist
    const purchaseCollectionExists = await mongoose.connection.db.listCollections({ name: 'purchases' }).hasNext();
    const purchaseItemCollectionExists = await mongoose.connection.db.listCollections({ name: 'purchaseitems' }).hasNext();

    if (!purchaseCollectionExists) {
      console.log('Creating "purchases" collection...');
      await Purchase.init(); // collection created
    }

    if (!purchaseItemCollectionExists) {
      console.log('Creating "purchaseitems" collection...');
      await PurchaseItem.init(); // collection created
    }

    console.log('Migration complete.');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    mongoose.connection.close();
  }
});