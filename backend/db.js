// backend/db.js

import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect('mongodb+srv://sahil12:<Sahil@2571>@gym.qdsqojr.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
