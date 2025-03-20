import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

const connectToDatabase = async () => {
    try {
        console.log('🟠 Attempting to connect to database...');
        await mongoose.connect(DB_URI);
        console.log(`✅ Connected to database in ${NODE_ENV} mode`);
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        throw error;
    }
};

export default connectToDatabase;
