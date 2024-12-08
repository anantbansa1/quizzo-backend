import {
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { State } from "~src/svc/modules/common/enums/entities";

export abstract class Metadata {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @CreateDateColumn({ type: "timestamp" })
  @Index()
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  @Index()
  updatedAt!: Date;

  @Column({ type: "enum", enum: State, default: State.ACTIVE })
  @Index()
  state!: State;
}
