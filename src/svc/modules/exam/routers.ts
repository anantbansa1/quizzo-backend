import express from "express";
import { asyncMiddleware } from "~src/svc/modules/common/middlewares/async";
import {
  attempt,
  createExam,
  deleteExam,
  getAllExams,
  getExam,
  getResults,
  updateExam,
} from "~src/svc/modules/exam/controllers";

export const examRouter = express.Router();

examRouter.post("/", asyncMiddleware(createExam));
examRouter.post("/update", asyncMiddleware(updateExam));
examRouter.get("/", asyncMiddleware(getExam));
examRouter.post("/attempt", asyncMiddleware(attempt));
examRouter.get("/results", asyncMiddleware(getResults));
examRouter.get("/all", asyncMiddleware(getAllExams));
examRouter.post("/delete", asyncMiddleware(deleteExam));
