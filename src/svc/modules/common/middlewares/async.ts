import { NextFunction, Request, RequestHandler, Response } from "express";
import * as core from "express-serve-static-core";
import { SentryClient } from "~src/clients/sentry";

export const asyncMiddleware =
  <
    P = core.ParamsDictionary,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = core.Query,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
  >(
    asyncHandler: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>,
  ) =>
  (
    request: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    response: Response<ResBody, Locals>,
    next: NextFunction,
  ) => {
    return Promise.resolve(asyncHandler(request, response, next)).catch((e) => {
      SentryClient.captureException(e);
      next(e);
    });
  };
