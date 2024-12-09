import { NextFunction, Request, Response } from "express";

export const internalServerErrorMiddleware = (
  error: Error,
  _: Request,
  response: Response,
  next: NextFunction,
) => {
  response.status(500).json({
    message: "Something went wrong",
  });
  next(error);
};
