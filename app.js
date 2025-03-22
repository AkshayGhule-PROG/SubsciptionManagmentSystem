import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();
const app = express();

// ✅ Middleware order corrected
app.use(express.json()); // Ensures JSON request body is parsed
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));

// ✅ Debugging middleware (optional)
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// ✅ Register Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// ✅ Error Handling Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
