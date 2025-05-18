import mongoose from "mongoose";
import {config} from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            config.MONGO_URL,
            {
                dbName: config.DB_NAME,
            }
        )
        console.log("conectado a MongoDB");
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error}`);
    }
}