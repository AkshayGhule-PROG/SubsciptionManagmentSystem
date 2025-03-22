// filepath: c:\Users\aghul\Desktop\SubsciptionManagmentSystem\database\mongodb.js
import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
    console.error('❌ No MongoDB URI provided');
    process.exit(1);
}

const connectToDatabase = async () => {
    try {
        console.log('🟠 Attempting to connect to database...');
        await mongoose.connect(DB_URI); // Removed deprecated options
        console.log(`✅ Connected to database in ${NODE_ENV} mode`);
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message);
        console.error('Full Error:', error);
        process.exit(1);
    }
};

export default connectToDatabase;