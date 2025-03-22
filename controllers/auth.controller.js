import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRE_IN } from "../config/env.js";


export const signUp=async (req,res,next)=>{
   const session=await mongoose.startSession();
    session.startTransaction();

    try{
        console.log("Received Headers:", req.headers);
        console.log("Received Request Body:", req.body); // 
        const {name,email,password}=req.body;
        // check if user already exists
        const existingUser=await User
        .findOne({email:email})

        if(existingUser){
            const error=new Error("User already exists");
            error.statusCode=409;
            throw error;
        }
    
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }
        // hash the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        // create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        }, { session: session });
        

        // generate jwt token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });


        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                user: newUser,
                token
            }
        });
        
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
   
}



