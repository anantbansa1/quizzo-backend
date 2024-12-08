import { Response } from "express";
import { User } from "~src/svc/modules/users";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type AuthenticatedResponse = Response<any, { user: User }>;
