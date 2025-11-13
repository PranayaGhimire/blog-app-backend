import express from "express";
import { mongoConnect } from "./config/db.js";
import dotenv  from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
const app = express();
dotenv.config();
app.use("/auth",authRoutes);
app.use("/posts",postRoutes);

app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT}`);
    mongoConnect();
});

