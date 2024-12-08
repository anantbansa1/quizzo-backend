import { z } from "zod";

export const PostLoginCredsSchema = z.object({
  email_id: z.string(),
  password: z.string(),
});

export const PostForgotPasswordSchema = z.object({
  email_id: z.string(),
});

export const PostResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string(),
});

export const PostSignupSchema = z.object({
  email_id: z.string(),
  name: z.string(),
  password: z.string(),
  dob: z.string(),
  institute: z.string(),
  role: z.string(),
});
export const updateSchema = z.object({
  email_id: z.string(),
  name: z.string(),
  dob: z.string(),
  institute: z.string(),
});
