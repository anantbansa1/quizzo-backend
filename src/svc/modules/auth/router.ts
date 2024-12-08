import express from "express";
import {
  postForgotPassword,
  postLoginCreds,
  postResetPassword,
  postSignup,
  updateDetails,
} from "~src/svc/modules/auth/controllers";
import { asyncMiddleware } from "~src/svc/modules/common/middlewares/async";

export const authRouter = express.Router();

authRouter.post("/login", asyncMiddleware(postLoginCreds));
authRouter.post("/forgot-password", asyncMiddleware(postForgotPassword));
authRouter.post("/reset-password", asyncMiddleware(postResetPassword));
authRouter.post("/signup", asyncMiddleware(postSignup));
authRouter.post("/update-details", asyncMiddleware(updateDetails));
