import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req,res) => {
    const token = req.headers.authorization[1];
    if(!token)
        res.status(401).json({message:"Token Missing"});
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid Token"});
    }
}