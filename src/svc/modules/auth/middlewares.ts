import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { conf } from "~src/config/settings";
import { IPayload } from "~src/svc/modules/auth/types";
import { AuthenticatedResponse } from "~src/svc/modules/common/types/http";
import { User } from "~src/svc/modules/users";
import { ALL_UNAUTHENTICATED_ROUTES } from "~src/svc/router";

export const authenticationMiddleware = async (
  request: Request,
  response: AuthenticatedResponse,
  next: NextFunction,
) => {
  if (ALL_UNAUTHENTICATED_ROUTES.includes(request.path)) {
    next();
    return;
  }

  const token = request.headers.token as string;
  let payload: IPayload;
  try {
    payload = jwt.verify(token, conf.JWT_SECRET_KEY || "my-secret") as IPayload;
  } catch {
    response.status(401).json({
      message: "Invalid token",
    });
    return;
  }
  const userRepo = conf.DEFAULT_DATA_SOURCE.getRepository(User);
  const user = await userRepo.findOne({
    where: {
      emailId: payload.email_id,
    },
  });

  if (!user) {
    response.status(401).json({
      message: "User does not exist",
    });
    return;
  } else {
    response.locals.user = user;
    next();
    return;
  }
};
