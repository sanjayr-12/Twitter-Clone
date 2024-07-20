import mongoose from "mongoose";

const connectMongoDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connection to mongo: ${error.message}`);
    }
}

export default connectMongoDb