declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND_URL: string;
      PORT: string;
      JWT_SECRET_KEY: string;
      JWT_EXPIRES_IN: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_MAIL: string;
      SMTP_PASSWORD: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: string;
      DB_USER: string;
      DB_HOST: string;
      DB_SSL: string;
      FRONTEND_URL: string;
    }
  }
}

export {};
