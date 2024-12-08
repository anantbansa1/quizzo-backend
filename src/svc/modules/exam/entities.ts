import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Metadata } from "~src/svc/modules/common/entities/metadata";
import {
  IAdditionalQuestions,
  IExamResponse,
  IQuestion,
} from "~src/svc/modules/exam/types";
import { User } from "~src/svc/modules/users/entities";

@Entity({ name: "exam" })
export class Exam extends Metadata {
  @Column({ type: "jsonb" })
  questions?: IQuestion[] | null;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "datetime" })
  startTime!: Date;

  @Column({ type: "datetime" })
  duration!: number;

  @Column({ type: "boolean", default: false })
  results!: boolean;

  @Column({ type: "jsonb", nullable: true })
  additionalQuestions?: IAdditionalQuestions[] | null;

  @ManyToOne(() => User, (user) => user.createdExams, { nullable: false })
  createdBy!: User;

  @OneToMany(() => ExamResponse, (examResponse) => examResponse.exam)
  examResponses!: ExamResponse[];
}

@Entity({ name: "exam_response" })
export class ExamResponse extends Metadata {
  @Column({ type: "jsonb" })
  answers!: IExamResponse[];

  @ManyToOne(() => User, (user) => user.examResponses, { nullable: false })
  user!: User;

  @ManyToOne(() => Exam, (exam) => exam.examResponses, { nullable: false })
  exam!: Exam;
}
