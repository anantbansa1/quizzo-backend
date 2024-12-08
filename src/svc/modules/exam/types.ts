import { z } from "zod";
import {
  AttempExamSchema,
  CreateExamSchema,
  DeleteExamSchema,
  GetExamSchema,
  GetResultSchema,
  UpdateExamSchema,
} from "~src/svc/modules/exam/schemas";

export type CreateExamRequest = z.infer<typeof CreateExamSchema>;
export type UpdateExamRequest = z.infer<typeof UpdateExamSchema>;
export type GetExamRequest = z.infer<typeof GetExamSchema>;
export type PostAttempExamRequest = z.infer<typeof AttempExamSchema>;
export type GetResultRequest = z.infer<typeof GetResultSchema>;
export type DeleteExamRequest = z.infer<typeof DeleteExamSchema>;

export interface IQuestion {
  questionId: string;
  options: { text: string }[];
  correctOptions: string[];
  answerText: string;
}

export interface IAdditionalQuestions {
  text: string;
}

export interface IExamResponse {
  questionId: string;
  selectedOptions: string[];
  answerText: string;
}
