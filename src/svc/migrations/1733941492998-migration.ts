import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733941492998 implements MigrationInterface {
  name = "Migration1733941492998";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exam_response"
            ALTER COLUMN "additionalAnswers" DROP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exam_response"
            ALTER COLUMN "additionalAnswers"
            SET NOT NULL
        `);
  }
}
