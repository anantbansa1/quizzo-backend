import { conf } from "~src/config/settings";
import { Exam, ExamResponse } from "~src/svc/modules/exam/entities";
import {
  IAdditionalAnswers,
  IAdditionalQuestions,
  IExamResponse,
  IQuestion,
  IResults,
} from "~src/svc/modules/exam/types";
import { User } from "~src/svc/modules/users";

const examRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Exam);
const respRepo = conf.DEFAULT_DATA_SOURCE.getRepository(ExamResponse);
export const createExamUtil = async (
  title: string,
  start_time: string,
  end_time: string,
  user: User,
  additional_questions: string,
) => {
  const parsedAdditionalQuestions = JSON.parse(
    additional_questions,
  ) as IAdditionalQuestions[];
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
    additionalQuestions: parsedAdditionalQuestions,
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
    if (user.role === "create") {
      return question;
    }
    const { correctOptions, answerText, ...rest } = question;
    console.log(correctOptions, answerText);
    return rest;
  });

  return {
    ...exam,
    questions: modifiedQuestions,
  };
};

export const attempExamUtils = async (
  responses: string,
  additionalResponse: string,
  exam: Exam,
  user: User,
) => {
  const attemptedResponse = JSON.parse(responses) as IExamResponse[];
  const additionalAnswers = JSON.parse(additionalResponse) as IAdditionalAnswers[];

  if (!exam) {
    throw new Error("Exam not found");
  }

  let examResponse = await respRepo.findOne({
    where: {
      user: user,
      exam: exam,
    },
  });

  if (examResponse) {
    examResponse.answers = attemptedResponse;
    examResponse.additionalAnswers = additionalAnswers;
  } else {
    examResponse = respRepo.create({
      answers: attemptedResponse,
      user: user,
      exam: exam,
      additionalAnswers: additionalAnswers,
    });
  }

  await respRepo.save(examResponse);
};

export const getAllResults = async (id: string) => {
  // Fetch all responses for the given exam
  const responses = await respRepo.find({
    where: {
      exam: {
        id: parseInt(id),
      },
    },
    relations: {
      user: true,
    },
  });

  // Fetch the original questions and answers for the given exam
  const originalAnswers = await examRepo.findOne({
    where: {
      id: parseInt(id),
    },
  });

  if (originalAnswers?.questions) {
    const results: IResults[] = [];

    responses.forEach((response) => {
      let totalMarks = 0;

      response.answers.forEach((examResponse: IExamResponse) => {
        const question = originalAnswers.questions?.find(
          (q) => q.questionId === examResponse.questionId,
        );

        if (!question) {
          return;
        }

        const { questionType, correctOptions, marks, answerText } = question;

        switch (questionType) {
          case 0:
            if (
              examResponse.selectedOptions.length === 1 &&
              examResponse.selectedOptions[0] === correctOptions[0]
            ) {
              totalMarks += marks;
            }
            break;

          case 1:
            if (
              examResponse.selectedOptions.length === correctOptions.length &&
              examResponse.selectedOptions.every((option) =>
                correctOptions.includes(option),
              )
            ) {
              totalMarks += marks;
            }
            break;

          case 2:
            if (
              examResponse.answerText?.trim().toLowerCase() ===
              answerText.trim().toLowerCase()
            ) {
              totalMarks += marks;
            }
            break;

          default:
            console.warn(`Unhandled question type: ${questionType}`);
        }
      });

      results.push({
        additionalAnswers: response.additionalAnswers || [],
        user: response.user,
        marks: totalMarks.toString(),
      });
    });

    return results;
  }

  return null;
};

export const getResult = async (id: string, user: User) => {
  const results = await respRepo.find({
    where: {
      exam: {
        id: parseInt(id),
      },
      user: {
        id: user.id,
      },
    },
  });
  return results;
};

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
