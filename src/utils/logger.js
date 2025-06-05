import winston from "winston";

export const loggerProd = winston.createLogger(
    {
        transports: [
            new winston.transports.Console(
                {
                    level: "info",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }
            ),
            new winston.transports.File({
                level: "error",
                filename: "./src/logs/errors.log",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                )
            })
        ]
    }
)

// Logger para desarrollo, para utilizarlo cambiar la variable 
//  de entorno NODE_ENV a "development"

export const loggerDev = winston.createLogger(
    {
        transports: [
            new winston.transports.Console(
                {
                    level: "debug",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }
            ),
            new winston.transports.File({
                level: "error",
                filename: "./src/logs/errors.log",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                )
            })
        ]
    }
)

let logger;
if (process.env.NODE_ENV === "production") {
    logger = loggerProd;
} else {
    logger = loggerDev;
}

export default logger;