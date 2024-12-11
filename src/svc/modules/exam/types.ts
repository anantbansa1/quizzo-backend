import { z } from "zod";
import {
  AttempExamSchema,
  CreateExamSchema,
  DeleteExamSchema,
  GetExamSchema,
  GetResultSchema,
  UpdateExamSchema,
} from "~src/svc/modules/exam/schemas";
import { User } from "~src/svc/modules/users";

export type CreateExamRequest = z.infer<typeof CreateExamSchema>;
export type UpdateExamRequest = z.infer<typeof UpdateExamSchema>;
export type GetExamRequest = z.infer<typeof GetExamSchema>;
export type PostAttempExamRequest = z.infer<typeof AttempExamSchema>;
export type GetResultRequest = z.infer<typeof GetResultSchema>;
export type DeleteExamRequest = z.infer<typeof DeleteExamSchema>;

export interface IQuestion {
  questionId: string;
  questionText: string;
  options: { text: string }[];
  correctOptions: string[];
  marks: number;
  answerText: string;
  questionType: number;
}

export interface IAdditionalQuestions {
  questionId: string;
  text: string;
}

export interface IExamResponse {
  questionId: string;
  selectedOptions: string[];
  answerText: string;
  additionalAnswers: string;
}

export interface IAdditionalAnswers {
  questionId: string;
  answer: string;
}

export interface IResults {
  additionalAnswers: IAdditionalAnswers[];
  user: User;
  marks: string;
}
