import express from "express";
import cors from "cors"
import { mongoConnect } from "./config/db.js";
import dotenv  from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.get("/",(req,res) => res.send(`
    <h2>API Working Fine</h2>
    <h3>Endpoints</h3>
    <h4>/api/auth/register</h4>
    <h4>/api/auth/login</h4>
    <h4>/api/posts</h4>
    `))
app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT}`);
    mongoConnect();
});

