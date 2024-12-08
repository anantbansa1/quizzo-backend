import express from "express";
import { HEALTH_UNAUTHENTICATED_ROUTES, healthRouter } from "~src/svc/modules/health";
import {
  AUTH_UNAUTHENTICATED_ROUTES,
  authRouter,
  authenticationMiddleware,
} from "~src/svc/modules/auth";

import { examRouter } from "~src/svc/modules/exam";

export const router = express.Router();

export const ALL_UNAUTHENTICATED_ROUTES = [
  ...HEALTH_UNAUTHENTICATED_ROUTES.map((e) => `/health${e}`),
  ...AUTH_UNAUTHENTICATED_ROUTES.map((e) => `/auth${e}`),
];

router.use(authenticationMiddleware);
router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/exams", examRouter);
