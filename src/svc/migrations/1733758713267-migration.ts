import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733758713267 implements MigrationInterface {
    name = 'Migration1733758713267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_state_enum" AS ENUM('0', '1', '2')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "state" "public"."user_state_enum" NOT NULL DEFAULT '0',
                "emailId" character varying(255) NOT NULL,
                "name" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "resetPasswordToken" character varying(255),
                "role" character varying NOT NULL,
                "dob" date NOT NULL,
                "institute" character varying(255) NOT NULL,
                CONSTRAINT "UQ_1af105e69b4350d9b89728a52a6" UNIQUE ("emailId"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_80ca6e6ef65fb9ef34ea8c90f4" ON "user" ("updatedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_45fdef50616d8364be025a09b1" ON "user" ("state")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6620cd026ee2b231beac7cfe57" ON "user" ("role")
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."exam_state_enum" AS ENUM('0', '1', '2')
        `);
        await queryRunner.query(`
            CREATE TABLE "exam" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "state" "public"."exam_state_enum" NOT NULL DEFAULT '0',
                "questions" jsonb NOT NULL,
                "title" character varying NOT NULL,
                "startTime" TIMESTAMP NOT NULL,
                "duration" TIMESTAMP NOT NULL,
                "results" boolean NOT NULL DEFAULT false,
                "additionalQuestions" jsonb,
                "createdById" integer NOT NULL,
                CONSTRAINT "PK_56071ab3a94aeac01f1b5ab74aa" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dfdbff877c2c482727992de94d" ON "exam" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6e3bf5244aa5eb8ece33435127" ON "exam" ("updatedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_058260f3762d62e439366c4e8a" ON "exam" ("state")
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."exam_response_state_enum" AS ENUM('0', '1', '2')
        `);
        await queryRunner.query(`
            CREATE TABLE "exam_response" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "state" "public"."exam_response_state_enum" NOT NULL DEFAULT '0',
                "answers" jsonb NOT NULL,
                "userId" integer NOT NULL,
                "examId" integer NOT NULL,
                CONSTRAINT "PK_a7a35b2e65c8b490144bf4c1e17" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7d2d3bd3bc1d719401189ef080" ON "exam_response" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_20837807667d55c3efba8d62dd" ON "exam_response" ("updatedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dfb05291f26cd606f83f0e8c2d" ON "exam_response" ("state")
        `);
        await queryRunner.query(`
            ALTER TABLE "exam"
            ADD CONSTRAINT "FK_a9c3522d6e92161b96929eb697b" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam_response"
            ADD CONSTRAINT "FK_0e4cffbca2e7734a877e4e678cd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "exam_response"
            ADD CONSTRAINT "FK_b831c41a99674ba1b7da81034fc" FOREIGN KEY ("examId") REFERENCES "exam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "exam_response" DROP CONSTRAINT "FK_b831c41a99674ba1b7da81034fc"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam_response" DROP CONSTRAINT "FK_0e4cffbca2e7734a877e4e678cd"
        `);
        await queryRunner.query(`
            ALTER TABLE "exam" DROP CONSTRAINT "FK_a9c3522d6e92161b96929eb697b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_dfb05291f26cd606f83f0e8c2d"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_20837807667d55c3efba8d62dd"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7d2d3bd3bc1d719401189ef080"
        `);
        await queryRunner.query(`
            DROP TABLE "exam_response"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."exam_response_state_enum"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_058260f3762d62e439366c4e8a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_6e3bf5244aa5eb8ece33435127"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_dfdbff877c2c482727992de94d"
        `);
        await queryRunner.query(`
            DROP TABLE "exam"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."exam_state_enum"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_6620cd026ee2b231beac7cfe57"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_45fdef50616d8364be025a09b1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_80ca6e6ef65fb9ef34ea8c90f4"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e11e649824a45d8ed01d597fd9"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_state_enum"
        `);
    }

}
