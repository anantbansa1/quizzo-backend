import { CorsOptions } from "cors";
import { DataSource } from "typeorm";

export interface Config {
  PORT: string;
  JWT_SECRET_KEY: string;
  JWT_EXPIRES_IN: string;
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_MAIL: string;
  SMTP_PASSWORD: string;
  CORS: CorsOptions;
  DEFAULT_DATA_SOURCE: DataSource;
  FRONTEND_URL: string;
}
