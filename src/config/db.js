import mongoose from "mongoose";
import {config} from "./config.js";
import logger from "../utils/logger.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            config.MONGO_URL,
            {
                dbName: config.DB_NAME,
            }
        )
        logger.info("conectado a MongoDB");
    } catch (error) {
        logger.error(`Error al conectar a MongoDB: ${error}`);
    }
}