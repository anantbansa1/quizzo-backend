import { NextFunction, Request, Response } from "express";
import { SentryClient } from "~src/clients/sentry";

export const internalServerErrorMiddleware = (
  error: Error,
  _: Request,
  response: Response,
  next: NextFunction,
) => {
  SentryClient.captureException(error);
  response.status(500).json({
    message: "Something went wrong",
  });
  next(error);
};
