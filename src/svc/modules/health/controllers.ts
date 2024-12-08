import { Request, Response } from "express";

export const getHealthCheck = (_: Request, response: Response) => {
  console.log("Testing merge");
  response.json({
    message: "Health check successful",
    data: "OK",
  });
};
