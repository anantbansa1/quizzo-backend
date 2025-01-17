import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Metadata } from "~src/svc/modules/common/entities/metadata";
import {
  IAdditionalAnswers,
  IAdditionalQuestions,
  IExamResponse,
  IQuestion,
} from "~src/svc/modules/exam/types";
import { User } from "~src/svc/modules/users/entities";

@Entity({ name: "exam" })
export class Exam extends Metadata {
  @Column({ type: "jsonb", nullable: true })
  questions?: IQuestion[] | null;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "timestamp" })
  startTime!: Date;

  @Column({ type: "integer" })
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

  @Column({ type: "jsonb", nullable: true })
  additionalAnswers!: IAdditionalAnswers[];

  @ManyToOne(() => User, (user) => user.examResponses, { nullable: false })
  user!: User;

  @ManyToOne(() => Exam, (exam) => exam.examResponses, { nullable: false })
  exam!: Exam;
}
