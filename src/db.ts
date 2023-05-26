import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    if (connection) {
      console.log(`MongoDB connected: ${connection.connection.host}`);
    }
  } catch (error) {
    console.log('Error connecting to database', error);
    throw error;
  }
};

export default connectToDatabase;
