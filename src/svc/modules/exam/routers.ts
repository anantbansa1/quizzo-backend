import express from "express";
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

examRouter.post("/", createExam);
examRouter.post("/update", updateExam);
examRouter.get("/", getExam);
examRouter.post("/attempt", attempt);
examRouter.get("/results", getResults);
examRouter.get("/all", getAllExams);
examRouter.post("/delete", deleteExam);
