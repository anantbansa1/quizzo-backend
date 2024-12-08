import { NextFunction, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { conf } from "~src/config/settings";
import { getUserByEmail } from "~src/svc/modules/users/utils";
import { AuthenticatedResponse } from "~src/svc/modules/common/types/http";
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
  let payload: JwtPayload;
  try {
    payload = jwt.verify(token, conf.JWT_SECRET_KEY || "my-secret") as JwtPayload;
  } catch {
    response.status(401).json({
      message: "Invalid token",
    });
    return;
  }

  const user = await getUserByEmail(payload.email_id as string);
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
