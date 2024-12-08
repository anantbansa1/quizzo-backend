// TODO: I don't think there is a need for a token model
import { z } from "zod";
import {
  PostSignupSchema,
  PostForgotPasswordSchema,
  PostLoginCredsSchema,
  PostResetPasswordSchema,
  updateSchema,
} from "~src/svc/modules/auth/schemas";

export interface IToken {
  id: string;
  token: string;
}

export interface IAuthenticationPayload {
  email_id: string;
  name: string;
  iad?: string;
}

export type PostLoginCredsRequest = z.infer<typeof PostLoginCredsSchema>;

export type PostResetPasswordRequest = z.infer<typeof PostResetPasswordSchema>;

export type PostForgotPasswordRequest = z.infer<typeof PostForgotPasswordSchema>;

export type PostSignupRequest = z.infer<typeof PostSignupSchema>;
export type PostUpdateRequest = z.infer<typeof updateSchema>;
