import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  dbName: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 3306,
  user: process.env.DATABASE_USER,
}));
