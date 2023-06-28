import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1687954055810 implements MigrationInterface {
    name = 'Migration1687954055810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "word" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_34c544b10da5a65ff75cb7a6f7" ON "word" ("title") `);
        await queryRunner.query(`CREATE TABLE "translation" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "wordId" integer, CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b3dc736a4949bb5a94527eea66" ON "translation" ("title") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "status" character varying NOT NULL, "statusCounter" integer NOT NULL, "messageTimeCounter" integer NOT NULL, "doNotDisturb" character varying, "billStatus" character varying NOT NULL, "payday" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_85fc1e6d10ed8d8311f6c77bf6" ON "user" ("payday") `);
        await queryRunner.query(`CREATE TABLE "userword" ("id" SERIAL NOT NULL, "wordId" integer NOT NULL, "userId" character varying NOT NULL, "status" character varying NOT NULL, "statusCounter" integer NOT NULL, CONSTRAINT "PK_da4b2d12e0659ee368e152c248e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_211bf681412855aad5523708e5" ON "userword" ("wordId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e0660fb61c11ed54832c8b34c8" ON "userword" ("userId") `);
        await queryRunner.query(`ALTER TABLE "translation" ADD CONSTRAINT "FK_a3ef0bba28e2809aaddad485c1f" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "translation" DROP CONSTRAINT "FK_a3ef0bba28e2809aaddad485c1f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0660fb61c11ed54832c8b34c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_211bf681412855aad5523708e5"`);
        await queryRunner.query(`DROP TABLE "userword"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_85fc1e6d10ed8d8311f6c77bf6"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3dc736a4949bb5a94527eea66"`);
        await queryRunner.query(`DROP TABLE "translation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34c544b10da5a65ff75cb7a6f7"`);
        await queryRunner.query(`DROP TABLE "word"`);
    }

}
