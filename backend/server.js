import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import connectMongoDb from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
const app = express()
dotenv.config()
const PORT = process.env.PORT || 4000

app.use(express.json())        
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/auth",authRoutes)

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
    connectMongoDb()
})