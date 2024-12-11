import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733946199883 implements MigrationInterface {
  name = "Migration1733946199883";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exam"
            ALTER COLUMN "questions" DROP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "exam"
            ALTER COLUMN "questions"
            SET NOT NULL
        `);
  }
}
