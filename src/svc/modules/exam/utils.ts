import { conf } from "~src/config/settings";
import { Exam, ExamResponse } from "~src/svc/modules/exam/entities";
import {
  IAdditionalQuestions,
  IExamResponse,
  IQuestion,
} from "~src/svc/modules/exam/types";
import { User } from "~src/svc/modules/users";

const examRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Exam);
const respRepo = conf.DEFAULT_DATA_SOURCE.getRepository(ExamResponse);
export const createExamUtil = async (
  title: string,
  start_time: string,
  end_time: string,
  user: User,
) => {
  const startTime = new Date(start_time);
  const endTime = new Date(end_time);

  const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
  if (duration <= 0) {
    throw new Error("End time must be after start time");
  }

  const exam = examRepo.create({
    title,
    startTime,
    duration,
    createdBy: user,
  });
  const savedExam = await examRepo.save(exam);
  return savedExam;
};

export const updateExamUtils = async (
  questions: string,
  title: string,
  start_time: string,
  end_time: string,
  id: string,
  additional_questions: string,
) => {
  const parsedQuestions = JSON.parse(questions) as IQuestion[];
  const parsedAdditionalQuestions: IAdditionalQuestions[] = JSON.parse(
    additional_questions,
  ) as IAdditionalQuestions[];

  const startTime = new Date(start_time);
  const endTime = new Date(end_time);
  const duration = endTime.getTime() - startTime.getTime();

  const exam = await examRepo.findOne({
    where: { id: parseInt(id) },
    relations: ["createdBy"],
  });

  if (!exam) {
    throw new Error("Exam not found");
  }

  exam.title = title;
  exam.startTime = startTime;
  exam.duration = duration;
  exam.questions = parsedQuestions;
  exam.additionalQuestions = parsedAdditionalQuestions;

  await examRepo.save(exam);
};

export const getExamUtils = async (id: string, user: User) => {
  const exam = await examRepo.findOne({
    where: {
      id: parseInt(id),
    },
  });
  if (!exam) {
    throw new Error("Exam not found");
  }
  if (!exam.questions) {
    return null;
  }
  const modifiedQuestions = exam.questions.map((question: IQuestion) => {
    if (user.role === "teacher") {
      return question;
    }
    const { correctOptions, answerText, ...rest } = question;
    return rest;
  });

  return {
    ...exam,
    questions: modifiedQuestions,
  };
};

export const attempExamUtils = async (
  responses: string,
  examId: string,
  user: User,
) => {
  const attemptedResponse = JSON.parse(responses) as IExamResponse[];
  const exam = await examRepo.findOne({
    where: {
      id: parseInt(examId),
    },
  });
  if (!exam) {
    throw new Error("Exam not found");
  }
  const examResponse = respRepo.create({
    answers: attemptedResponse,
    user: user,
    exam: exam,
  });

  // Save the response to the database
  await respRepo.save(examResponse);
};

export const getAllResults = async (id: string) => {};

export const getFullResult = async (id: string, user: User) => {};

export const getResult = async (id: string, user: User) => {};

export const getAllExamsUtils = async (user: User) => {
  const userExams = await respRepo.find({
    where: {
      user: {
        id: user.id,
      },
    },
    relations: {
      exam: true,
    },
  });
  const teacherExams = await examRepo.find({
    where: {
      createdBy: {
        id: user.id,
      },
    },
  });
  return [...userExams, ...teacherExams];
};

export const deleteExamUtils = async (id: string) => {
  const examId = parseInt(id, 10);
  if (isNaN(examId)) {
    throw new Error(`Invalid exam ID: ${id}`);
  }
  await examRepo.delete({ id: examId });
};
