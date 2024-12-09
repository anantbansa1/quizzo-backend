import express from "express";
import morgan from "morgan";
import cors from "cors";

import { initializeDataSources } from "~src/config/data-source-initializer";
import { internalServerErrorMiddleware } from "~src/svc/modules/common/middlewares/error";
import { router } from "~src/svc/router";

export const createServer = async () => {
  try {
    await initializeDataSources();
    console.log("All data sources initialized successfully!");
  } catch (err) {
    console.error("Error initializing data sources:", err);
    throw err;
  }

  console.log("Initializing Server");
  const server = express();
  server.use(cors());

  server.use(morgan("combined"));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(router);

  server.use(internalServerErrorMiddleware);

  return server;
};
