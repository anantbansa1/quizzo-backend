import { NextFunction, Request } from "express";
import { conf } from "~src/config/settings";
import { AuthenticatedResponse } from "~src/svc/modules/common/types/http";
import { Exam } from "~src/svc/modules/exam/entities";
import {
  AttempExamSchema,
  CreateExamSchema,
  DeleteExamSchema,
  GetExamSchema,
  GetResultSchema,
  UpdateExamSchema,
} from "~src/svc/modules/exam/schemas";
import {
  CreateExamRequest,
  DeleteExamRequest,
  GetExamRequest,
  GetResultRequest,
  PostAttempExamRequest,
  UpdateExamRequest,
} from "~src/svc/modules/exam/types";
import {
  attempExamUtils,
  createExamUtil,
  deleteExamUtils,
  getAllExamsUtils,
  getAllResults,
  getExamUtils,
  getResult,
  updateExamUtils,
} from "~src/svc/modules/exam/utils";

export const createExam = async (
  request: Request,
  response: AuthenticatedResponse,
  next: NextFunction,
) => {
  let data: CreateExamRequest;
  try {
    data = CreateExamSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  const { title, start_time, end_time, additional_questions } = data;
  const user = response.locals.user;

  await createExamUtil(title, start_time, end_time, user, additional_questions);
  response.status(200).json({
    message: "user details updated successfully",
  });
  next();
};

export const updateExam = async (
  request: Request,
  response: AuthenticatedResponse,
  next: NextFunction,
) => {
  let data: UpdateExamRequest;
  try {
    data = UpdateExamSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  await updateExamUtils(
    data.questions,
    data.start_time,
    data.end_time,
    data.id,
    data.questions,
    data.additional_questions,
  );

  response.status(200).json({
    message: "user details updated successfully",
  });
  next();
};

export const getExam = async (
  request: Request,
  response: AuthenticatedResponse,
  next: NextFunction,
) => {
  let data: GetExamRequest;
  try {
    data = GetExamSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  const user = response.locals.user;

  await getExamUtils(data.id, user);
  response.status(200).json({
    message: "user details updated successfully",
  });
  next();
};

export const attempt = async (
  request: Request,
  response: AuthenticatedResponse,
  next: NextFunction,
) => {
  let data: PostAttempExamRequest;
  try {
    data = AttempExamSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  const user = response.locals.user;

  const examRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Exam);
  const exam = await examRepo.findOne({
    where: {
      id: parseInt(data.exam_id),
    },
  });
  if (!exam) {
    response.status(404).json({
      message: "Exam not found",
    });
    next();
    return;
  }
  const currentTime = new Date();
  const examStartTime = new Date(exam.startTime);
  const examEndTime = new Date(examStartTime.getTime() + exam.duration * 60 * 1000);

  if (currentTime < examStartTime) {
    response.status(401).json({ message: "Exam not started" });
    next();
    return;
  }

  if (currentTime > examEndTime) {
    response.status(401).json({ message: "Exam already ended" });
    next();
    return;
  }

  await attempExamUtils(data.responses, data.additionalResponse, exam, user);
  response.status(200).json({
    message: "exam attempted succssfully",
  });
  next();
};

export const getResults = async (
  request: Request,
  response: AuthenticatedResponse,
  next: NextFunction,
) => {
  let data: GetResultRequest;
  try {
    data = GetResultSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  const user = response.locals.user;

  const examRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Exam);
  const exam = await examRepo.findOne({
    where: {
      id: parseInt(data.id),
    },
  });
  if (!exam) {
    response.status(404).json({
      message: "Exam not found",
    });
    next();
    return;
  }

  if (user.role === "create") {
    const allResult = await getAllResults(data.id);
    response.status(200).json({
      data: allResult,
    });
    next();
    return;
  } else {
    const result = await getResult(data.id, user);
    response.status(200).json({
      data: result,
    });
    next();
    return;
  }
};

export const getAllExams = async (
  _: Request,
  response: AuthenticatedResponse,
  next: NextFunction,
) => {
  const user = response.locals.user;
  const exams = await getAllExamsUtils(user);
  response.status(200).json({
    data: exams,
  });
  next();
};

export const deleteExam = async (
  request: Request,
  response: AuthenticatedResponse,
  next: NextFunction,
) => {
  let data: DeleteExamRequest;
  try {
    data = DeleteExamSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  await deleteExamUtils(data.id);
  response.status(200).json({
    message: "exam deleted succesfully",
  });
  next();
};
