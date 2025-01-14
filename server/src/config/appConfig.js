import { config } from "dotenv";

config();

export const appConfig = {
  mongoUrl: process.env.MONGO_URL ?? "",
  port: process.env.PORT ?? 5000,
};
