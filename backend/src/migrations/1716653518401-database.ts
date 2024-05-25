import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1716653518401 implements MigrationInterface {
    name = 'Database1716653518401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" character varying, "attachments" bytea, "responsible" character varying(40), "status" character varying(15) NOT NULL, "time" character varying(15) NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
