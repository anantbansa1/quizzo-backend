// TODO: I don't think there is a need for a token model
import { JwtPayload } from "jsonwebtoken";
import { z } from "zod";
import {
  PostForgotPasswordSchema,
  PostLoginCredsSchema,
  PostResetPasswordSchema,
  PostSignupSchema,
  updateSchema,
} from "~src/svc/modules/auth/schemas";

export interface IToken {
  id: string;
  token: string;
}

export interface IAuthenticationPayload {
  email_id: string;
  name: string;
  role: string;
}

export interface IPayload extends JwtPayload {
  email_id: string;
}

export type PostLoginCredsRequest = z.infer<typeof PostLoginCredsSchema>;

export type PostResetPasswordRequest = z.infer<typeof PostResetPasswordSchema>;

export type PostForgotPasswordRequest = z.infer<typeof PostForgotPasswordSchema>;

export type PostSignupRequest = z.infer<typeof PostSignupSchema>;
export type PostUpdateRequest = z.infer<typeof updateSchema>;
