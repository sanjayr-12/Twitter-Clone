import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import connectMongoDb from "./db/connectMongoDB.js";
import {v2 as cloudinary} from "cloudinary"
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.routes.js"

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret:process.env.CLOUDINARY_CLOUD_SECRECT
})

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json())        
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
    connectMongoDb()
})