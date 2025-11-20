import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req,res) => {
    const {email,password} = req.body;
    try {
        const userExist = await User.findOne({email});
        if (userExist)
            return res.status(400).json({ message : "User already exist"});
        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({...req.body,password:hashPassword});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:user,
            token
        });   
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}

export const login = async (req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user)
            return res.status(400).json({message:"Invalid Credentials"});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.status(201).json({
            success:true,
            message:"User logged in successfully",
            data:user,
            token
        });    
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }       
}