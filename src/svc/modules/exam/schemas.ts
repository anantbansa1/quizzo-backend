import { z } from "zod";

export const CreateExamSchema = z.object({
  title: z.string(),
  start_time: z.string(),
  end_time: z.string(),
});

export const UpdateExamSchema = z.object({
  id: z.string(),
  questions: z.string(),
  additional_questions: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  title: z.string(),
});

export const GetExamSchema = z.object({
  id: z.string(),
});

export const AttempExamSchema = z.object({
  responses: z.string(),
  exam_id: z.string(),
});

export const DeleteExamSchema = z.object({
  id: z.string(),
});

export const GetResultSchema = z.object({
  id: z.string(),
});
