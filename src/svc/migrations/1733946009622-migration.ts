import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733946009622 implements MigrationInterface {
  name = "Migration1733946009622";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exam" DROP COLUMN "duration"
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"
            ADD "duration" integer NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exam" DROP COLUMN "duration"
        `);
    await queryRunner.query(`
            ALTER TABLE "exam"
            ADD "duration" TIMESTAMP NOT NULL
        `);
  }
}
