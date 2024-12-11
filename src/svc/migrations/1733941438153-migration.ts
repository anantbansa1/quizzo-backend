import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733941438153 implements MigrationInterface {
  name = "Migration1733941438153";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exam_response"
            ADD "additionalAnswers" jsonb NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exam_response" DROP COLUMN "additionalAnswers"
        `);
  }
}
