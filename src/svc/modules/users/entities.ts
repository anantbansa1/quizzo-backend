import { Column, Entity, Index, OneToMany } from "typeorm";
import { Metadata } from "~src/svc/modules/common/entities/metadata";
import { Exam, ExamResponse } from "~src/svc/modules/exam/entities";

@Entity({ name: "user" })
export class User extends Metadata {
  @Column({ type: "varchar", length: 255, unique: true })
  emailId!: string;

  @Column({ type: "varchar", length: 255 })
  @Index()
  name!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  resetPasswordToken!: string | null;

  @Column({ type: "varchar" })
  @Index()
  role!: string;

  @Column({ type: "date" })
  dob!: Date;

  @Column({ type: "varchar", length: 255 })
  institute!: string;

  @OneToMany(() => Exam, (exam) => exam.createdBy)
  createdExams!: Exam[];

  @OneToMany(() => ExamResponse, (examResponse) => examResponse.user)
  examResponses!: Response[];
}
