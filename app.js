import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';

const app = express();

async function startServer() {
    console.log('🟠 Attempting to connect to database...');
    await connectToDatabase();

    app.get('/', (req, res) => {
        res.send('Welcome To Subscription Tracker API');
    });

    app.listen(PORT, () => {
        console.log(`🚀 Subscription Tracker API running on http://localhost:${PORT}`);
    });
}

startServer().catch(err => {
    console.error('❌ Database connection failed:', err.message);
});
