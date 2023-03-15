import { registerAs } from "@nestjs/config";
import { LevelWithSilent } from "pino";

export const loggingConfig = registerAs("logging", () => {
  return {
    logLevel: (process.env.LOG_LEVEL || "info") as LevelWithSilent,
    usedLogger: (process.env.LOG_USED_LOGGER || "default") as
      | "default"
      | "pino",
    dbLogger: (process.env.LOG_DB_LOGGER || "default") as
      | "none"
      | "default"
      | "pino",
    logToFile: process.env.LOG_TO_FILE === "true",
    destination: process.env.LOG_DESTINATION || "logs",
  };
});
