const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to MongoDB Atlas');
mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) {
    console.error('Error listing collections:', err);
    } else {
    console.log('Collections:', collections);
    }
    mongoose.connection.close();
});
})
.catch((error) => {
console.error('Error connecting to MongoDB Atlas:', error);
});
