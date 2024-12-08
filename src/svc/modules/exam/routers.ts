import { attempt } from "bluebird";
import express from "express";
import {
  createExam,
  updateExam,
  getExam,
  getResults,
  getAllExams,
  deleteExam,
} from "~src/svc/modules/exam/controllers";

export const examRouter = express.Router();

examRouter.post("/", createExam);
examRouter.post("/update", updateExam);
examRouter.get("/", getExam);
examRouter.post("/attempt", attempt);
examRouter.get("/results", getResults);
examRouter.get("/all", getAllExams);
examRouter.post("/delete", deleteExam);
