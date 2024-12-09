import * as process from "node:process";
import dotenv from "dotenv";
import defaultDataSource from "~src/config/ormconfig.pgap";
import { Config } from "~src/config/types";

dotenv.config();

export const conf: Config = {
  FRONTEND_URL: process.env.FRONTEND_URL,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_MAIL: process.env.SMTP_MAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  CORS: {
    origin: [process.env.BACKEND_URL],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  DEFAULT_DATA_SOURCE: defaultDataSource,
};
