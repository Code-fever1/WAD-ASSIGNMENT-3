const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/library_management';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

module.exports = { connectDB };

