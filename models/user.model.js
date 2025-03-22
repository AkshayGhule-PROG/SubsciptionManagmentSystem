import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"], // Array for custom error message
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"], // Minimum length
        maxlength: [50, "Name must be at most 50 characters long"], // Maximum length
    },
    email: {
        type: String,
        required: [true, "Email is required"], // Array for custom error message
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Regex to validate email format
    },
    password: {
        type: String,
        required
            :
            [true, "Password is required"], // Custom error message
        minlength
            :
            [8, "Password must be at least 8 characters long"], // Minimum length
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;